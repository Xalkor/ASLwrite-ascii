#include "node.h"
#include <iterator>
#include <unordered_map>
#include <unordered_set>

/*
std::unordered_set<std::string> digits = {"0-num","0-flat","1-num","1-claw","1-d","1-i","2-num","2-bend","2-claw","2-close","2-cross","3-num","3-claw","3-close","3-flat","3-k","4-num","4-close","4-claw","5-num","5-close","5-claw","5-half","5-bend","5-c","6-num","6-claw","6-inverse","7-num","7-8","8-num","8-inverse","8-open","9-num","10-num","10-a","10-s","10-t","20-num","1-thumb","20-claw","20-g"};
std::unordered_map<std::string, GraphemeList*> vars = {};

void Document::run(State* state) {
    for (auto it = _assignments.rbegin(); it != _assignments.rend(); ++it) {
        Assignment* assgn = *it;
        assgn->run(state);
    }
}

void Assignment::run(State* state) {
    for(Iden* name: *_idens) {
        LOG(1, "new var: %s -> %s\n", name->getVal().c_str(), _graphemes->toString().c_str());
        vars[name->getVal()] = _graphemes;
    }
}

void Arrow::run(State* state) { throw "Not Implemented"; }
void Iden::run(State* state) { throw "Not Implemented"; }
void Diacritic::run(State* state) { throw "Not Implemented"; }
void IdenList::run(State* state) { throw "Not Implemented"; }
void Num::run(State* state) { throw "Not Implemented"; }
void ArgList::run(State* state) { throw "Not Implemented"; }
void Command::run(State* state) { throw "Not Implemented"; }
void CommandList::run(State* state) { throw "Not Implemented"; }
void CommandGroup::run(State* state) { throw "Not Implemented"; }
void SimpleGrapheme::run(State* state) { throw "Not Implemented"; }
void ProgrammedGrapheme::run(State* state) { throw "Not Implemented"; }
void GraphemeList::run(State* state) { throw "Not Implemented"; }
*/