===
# ASLType
---
## What is ASLType!?
ASLType is a typesetting program for ASLwrite. 
It allows for a combination of english text and ASLwrite "Graphemes".
A Grapheme can be a handshape like @num_5@, or a sign like @want@.
The English text is written in a language called [Markdown](https://en.wikipedia.org/wiki/Markdown)
Which is an intuitive, human-readable language for writing HTML documents. 

An ASLType document contains two sections, the definitions and the body. They are separated by three equals signs (`===`).
For now let's focus on the second section, the body.

There is an interactive editor where you can play around with the language on [my website](https://xalkor.github.io/ASLwrite-ascii/parser/dist/).

This document was actually written entirely with ASLType!

If you're on my website you can see the source code for this document on the left of your screen. And you'll notice that `===` at the top.
For now you should just think that that means the start of a document, but eventually you'll learn how to use the upper section as well.

## The body
The body is where the main content of your document goes. By default everything you write is plain english text, interpreted using Markdown.
### Inline ASL
You can add ASLwrite signs by wrapping the sign name in at-signs (`@`).
If your body looked like:
```
    The handshape for 5 looks like: @num_5@
```
it would render as:

The handshape for 5 looks like: @num_5@

Cool right!

### Multi-line ASL
You can create multi-line ASL blocks using triple at-signs (`@@@`)

So if your body looked like:
```
Here's the sentence "I want to study" in ASLwrite:
@@@
I want study
@@@
```

it would render as:

Here's the sentence "I want to study" in ASLwrite:
@@@
I want study
@@@

And these triple at blocks can be multiple lines long. For example,
```
Let's countdown from three then say want:
@@@
num_3 num_2 num_1
want
@@@
```

renders as:

Let's countdown from three and then say want:
@@@
num_3 num_2 num_1
want
@@@

## A confession...
You may have noticed that the vocabulary I have included in the examples so far is very... limited.

It's true, I have only implemented a small number of handshapes and signs.

Below is a table showing all handshapes, signs and diacritics currently implemented in ASLType. (The names for handshapes are based on the names given to each handshape by [handspeak](https://www.handspeak.com/learn/438/))

### Handshapes
|name   |render |
|:-----:|-------|
|`num_1`|@num_1@|
|`num_2`|@num_2@|
|`num_3`|@num_3@|
|`num_4`|@num_4@|
|`num_5`|@num_5@|
|`claw_5`|@claw_5@|
|`close_5`|@close_5@|

### Signs
|name   |render |
|:-----:|-------|
|`I` or `me`|@me@|
|`want`|@want@|
|`study`|@study@|

### Diacritics
|name   |render |
|:-----:|-------|
|`~`|@~@|

*Note:* The symbol `~` is used to represent "flutter".

## But...!
Fear not, even if I don't create a handshape or a sign for you, ASLType is extendable!
I have implemented an entire programming language for defining new symbols.
A tutorial for this language is coming soon, as I am still finalizing the way it works.

If I'm being honest I've just barely gotten it working enough to create this small handful of symbols and write this document.
But it's coming soon!
