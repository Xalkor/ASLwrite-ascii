#pragma once

#include <iostream>
#include <vector>
#include <stack>
#include <tuple>
#include <memory>
#include <string>
#include <sstream>

#ifdef DEBUG
    #include <stdio.h>
    #define LOG(lvl, s, ...) if(lvl <= DEBUG) printf(s, __VA_ARGS__)
#else
    #define LOG(s, ...) ((void)0)
#endif

struct State {
    double x = 0, y = 0;
    double angle = 0;
    bool flipped = false;

    private:
        using Save = std::tuple<double, double, double, bool>;
        std::stack<Save> _stack;

    public:
        void save() {
            _stack.push({x, y, angle, flipped});
        }

        bool restore() {
            if (_stack.empty())
                return false;

            auto [sx, sy, sa, sf] = _stack.top();
            _stack.pop();

            x = sx;
            y = sy;
            angle = sa;
            flipped = sf;

            return true;
        }

        void home() {
            x = 0; y = 0;
            angle = 0;
            flipped = false;
        }
};

const std::string space = "|  ";

class Node {
    public:
        Node() { LOG(2, "%s\n", "Node Created"); };
        std::string toString() { return this->_toString(""); };  
        virtual std::string _toString(std::string indent="") = 0;   
        //virtual void run(State* state) = 0;
};

class Arrow: public Node {
    bool        _turn;
    bool        _firm;
    bool        _vert;
    const char* _dots;

    public:
        Arrow(bool turn, bool firm, const char* dots): _turn(turn), _firm(firm), _vert(false), _dots(dots), Node() {};
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "Arrow{ ";                     
            if(_vert) ss << "|";
            ss << "-";
            if(_turn) ss << ">";
            if(_firm) ss << "!";
            if(_dots) ss << _dots;
            ss << " }";

            return ss.str();  
        }
        Arrow* make_vertical() { _vert = true; return this; }
        /*void run(State* state);*/
};

class Iden: public Node {
    std::string _val;
    public:
        Iden(std::string val): _val(val), Node() {};
        std::string _toString(std::string indent="") { 
            return indent + "Iden{" + _val + "}"; 
        }
        std::string getVal() { return _val; }
        /*void run(State* state);*/
};

class Diacritic: public Node {
    public:
        enum class Type {
            HINGE,
            ROTATIONAL,
            FLUTTER,
            RATTLE
        };
    private: 
        Type _type;
    public:
        Diacritic(Type type): _type(type), Node() {};
        std::string _toString(std::string indent="") { 
            switch(_type) {
                case Type::HINGE:      return indent+"Diacritic{^}"; 
                case Type::ROTATIONAL: return indent+"Diacritic{@}"; 
                case Type::FLUTTER:    return indent+"Diacritic{~}"; 
                case Type::RATTLE:     return indent+"Diacritic{\"}"; 
            }
        }
        /*void run(State* state);*/
};

class IdenList: public Node {
    std::vector<Iden*> _idens;
    public:
        IdenList(Node* init): _idens(), Node() { LOG(1, "%s\n", "IdenList Created"); push(init); };
    
        IdenList* push(Node* next) { 
            LOG(1, "Adding iden to list: [%s]\n", next->toString().c_str()); 
            Iden* in = static_cast<Iden*>(next);
            _idens.push_back(in); 
            return this; 
        }
    
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "IdenList{\n";                     
            for(int i = _idens.size()-1; i >= 0; i--) {
                ss << _idens[i]->_toString(indent+space);
                if(i > 0) ss << ",\n";
            }

            ss << "\n" << indent << "}";

            return ss.str(); 
        }
        auto begin() { return _idens.begin(); }
        auto end()   { return _idens.end();   }
        /*void run(State* state);*/
};

class Num: public Node {
    double _val;
    public:
        Num(double val): _val(val), Node() {};
        std::string _toString(std::string indent="") { 
            return indent + "Num{" + std::to_string(_val) + "}"; 
        }
        /*void run(State* state);*/
};

class ArgList: public Node {
    std::vector<Node*> _args;
    public:
        ArgList(Node* init): _args(), Node() { LOG(1, "%s\n", "ArgList Created"); if(init) push(init); };
    
        ArgList* push(Node* next) { 
            LOG(1, "Adding arg to list: [%s]\n", next->toString().c_str()); 
            _args.push_back(next); 
            return this; 
        }
    
        std::string _toString(std::string indent="") { 
            if(_args.size() <= 0) return indent + "ArgList{}";

            std::stringstream ss;

            ss << indent << "ArgList{\n";                     
            for(int i = _args.size()-1; i >= 0; i--) {
                ss << _args[i]->_toString(indent+space);
                if(i > 0) ss << ",\n";
            }

            ss << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class Command: public Node {
    Iden* _name;
    ArgList* _args;
    public:
        Command(Node* name, Node* args): Node() {
            Iden* in = static_cast<Iden*>(name);
            ArgList* ala = static_cast<ArgList*>(args);
            _name = in;
            _args = ala;
        };
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "Command{\n"                    
               << _name->_toString(indent+space)
               << "\n"
               << _args->_toString(indent+space)
               << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class CommandList: public Node {
    std::vector<Command*> _commands;
    public:
        CommandList(Node* init): _commands(), Node() { LOG(1, "%s\n", "CommandList Created"); push(init); };
    
        CommandList* push(Node* next) { 
            LOG(1, "Adding command to list: [%s]\n", next->toString().c_str()); 
            Command* cn = static_cast<Command*>(next);
            _commands.push_back(cn); 
            return this; 
        }
    
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "CommandList{\n";                     
            for(int i = _commands.size()-1; i >= 0; i--) {
                ss << _commands[i]->_toString(indent+space);
                if(i > 0) ss << ",\n";
            }

            ss << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class CommandGroup: public Node {
    CommandList* _commands;
    public:
        CommandGroup(Node* commands): Node() {
            LOG(1, "%s\n", "CommandGroup Created");
            CommandList* clc = static_cast<CommandList*>(commands);
            _commands = clc; 
        };

        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "CommandGroup{\n"                   
               << _commands->_toString(indent+space)
               << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class Grapheme: public Node {
    public:
        Grapheme(): Node() {};
};

class SimpleGrapheme: public Grapheme {
    Iden* _iden;
    public:
        SimpleGrapheme(Node* iden): Grapheme() {
            LOG(1, "%s\n", "SimpleGrapheme Created");
            push_iden(iden); 
        };

        SimpleGrapheme* push_iden(Node* iden) { 
            LOG(1, "Adding iden to grapheme: [%s]\n", iden->toString().c_str()); 
            Iden* ii = static_cast<Iden*>(iden);
            _iden = ii;
            return this;
        }

        std::string _toString(std::string indent="") { 
            return indent + "SimpleGrapheme{" + _iden->toString() + "}"; 
        }
        /*void run(State* state);*/
};

class ProgrammedGrapheme: public Grapheme {
    CommandList* _commands;
    public:
        ProgrammedGrapheme(Node* commands): Grapheme() {
            LOG(1, "%s\n", "ProgrammedGrapheme Created");
            CommandList* clc = static_cast<CommandList*>(commands);
            _commands = clc; 
        };

        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "ProgrammedGrapheme{\n"                   
               << _commands->_toString(indent+space)
               << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class GraphemeList: public Node {
    std::vector<Grapheme*> _graphemes;
    public:
        GraphemeList(Node* init): _graphemes(), Node() { LOG(1, "%s\n", "GraphemeList Created"); push(init); };
    
        GraphemeList* push(Node* next) { 
            LOG(1, "Adding grapheme to list: [%s]\n", next->toString().c_str()); 
            Grapheme* gn = static_cast<Grapheme*>(next);
            _graphemes.push_back(gn); 
            return this; 
        }
    
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "GraphemeList{\n";                     
            for(int i = _graphemes.size()-1; i >= 0; i--) {
                ss << _graphemes[i]->_toString(indent+space);
                if(i > 0) ss << ",\n";
            }

            ss << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class Assignment: public Node {
    IdenList* _idens;
    GraphemeList* _graphemes;
    public:
        Assignment(Node* idens, Node* graphemes): Node() {
            IdenList* ili = static_cast<IdenList*>(idens);
            GraphemeList* glg = static_cast<GraphemeList*>(graphemes);
            _idens = ili;
            _graphemes = glg;
        };
        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "Assignment{\n"                    
               << _idens->_toString(indent+space)
               << "\n" << indent << space << "=\n"
               << _graphemes->_toString(indent+space)
               << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};

class Document: public Node {
    std::vector<Assignment*> _assignments;
    GraphemeList* _text;
    public:
        Document(Node* text): _assignments(), Node() { 
            LOG(1, "%s\n", "Document Created");
            push_text(text); 
        };
 
        Document* push_assignment(Node* next) { 
            LOG(1, "Adding assignment to document: [%s]\n", next->toString().c_str()); 
            Assignment* an = static_cast<Assignment*>(next);
            _assignments.push_back(an); 
            return this;
        }

        Document* push_text(Node* text) { 
            LOG(1, "Adding text to document: [%s]\n", text->toString().c_str()); 
            GraphemeList* glt = static_cast<GraphemeList*>(text);
            _text = glt;
            return this;
        }

        std::string _toString(std::string indent="") { 
            std::stringstream ss;

            ss << indent << "Document{\n";
                         
            for(int i = _assignments.size()-1; i >= 0; i--) {
                ss << _assignments[i]->_toString(indent+space) << ",\n";
            }

            ss << _text->_toString(indent+space);

            ss << "\n" << indent << "}";

            return ss.str(); 
        }
        /*void run(State* state);*/
};
