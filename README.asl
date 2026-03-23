import vocab
import alphabet
===
# ASLType
---
# What is ASLType!?
ASLType is a typesetting program for ASLwrite. It allows for a combination of english text and ASLwrite "Graphemes". A Grapheme can be a handshape like @num_5@, or a sign like @want@. 

The English text is written in a language called [Markdown](https://en.wikipedia.org/wiki/Markdown). Which is an intuitive, human-readable language for writing HTML documents. 

The ASLwrite is written by embedding images of the sign in the document by referencing their "names". The exact way this works is explained in great detail in the rest of this document.

# Who am I?
My name is @letter_E letter_l letter_i@ (Eli). I am a hearing computer scientist, with a general interest in ASL and ASLwrite (but very little experience with either). This is a fun project I've been working on in my free time the past few months, but any comments are certainly welcome!

I also want to mention that I think this is a good idea, I obviously don't believe it is a *replacement* for the font (which is very cool by the way) or for handwritting. This is a very English-centric way to write ASLwrite, and so I imagine it would be useful for creating resources, and for proficient signers to discuss ASL/ASLwrite online, but not for people learning ASLwrite, or using ASLwrite to take notes in an ASL class. In those scenarios I imaging both the font and handwriting would be far more effective, since you have to practice creating the shapes yourself. (The same way we teach children writing before typing.)

## The Editor

This document was actually written entirely with ASLType! You are currently reading it in an interactive editor where you can play around with ASLType. Just note that the editor is meant for playing around, <span style="color:red">***it does not save your changes if the page is refreshed!***</span>

### Try it yourself!

Replace the next line with whatever you want

*(put whatever you want here)*

then click the run button or hit `Ctrl` + `s` (`Cmd`+`s` on mac) to rebuild the document. You should see you new line in the document!

### Settings
In the bottom left there is a settings wheel. In that menu you can change the size of the ASLwrite graphemes and the size of the English text.

You can also turn on "Borders" which shows an outline on the graphemes.

Lastly you can change the "Compiler Type". 
 - The default is "HTML", which compiles the document into a simple webpage. 
  - There is also "raw HTML" which gives you the HTML code if you wanted to embed an ASLType document in another webpage, and apply your own styles.
  - You can also change it to "Markdown" which gives you the Markdown code for the document.
  - There is also "Debug HTML" mode which renders the document as a webpage, but also shows additional debugging information on the graphemes. This mode will be useful later when you try to define your own signs.
  - The last mode is "AST". This is mostly for me to try and find issues with the compiler, but if you're interested in how your document gets converted to HTML you can take a look at it.

# The Document Sections
An ASLType document contains two sections, the *definitions* and the *body*. They are separated by three equals signs (`===`). The equals signs do not appear in the final document, they just tell ASLType you are starting the main body. If you are familiar with HTML this is like the `<head>` and `<body>` tags, where setup information goes in the `<head>` and the main webpage goes in the `<body>`.

## The Definitions
In the definitions section you can 
  - import code others have written
    - for example, the graphemes I showed above were imported from my `vocab.asl` file (which you can see in the tab menu above the editor)
  - define your own graphemes

But for now let's focus on the second section, the body.

## The Body
The body is where the main content of your document goes. By default everything you write is plain english text, interpreted using Markdown. ASLwrite can be included in two ways, either as *inline content* or as a *block*.

### Inline ASL
You can add ASLwrite signs by surrounding the sign name in at-signs (`@`).
If your body looked like:
```
The handshape for 5 looks like: @num_5@
```
it would render as:

<pre>
The handshape for 5 looks like: @num_5@
</pre>

Cool right!

This mode is called *inline* because the ASLwrite symbol appears *in* the same *line* as the rest of text.

### Block ASL
You can create multi-line ASL blocks using triple at-signs (`@@@`)

So if your body looked like:
```
Here's the sentence "I want to study" in ASLwrite:
@@@
I want study
@@@
```

it would render as:

<pre>
Here's the sentence "I want to study" in ASLwrite:
@@@
I want study
@@@</pre>

Blocks always start on the next line, no matter how you write the code. So the body:
```
Here's the sentence "I want to study" in ASLwrite: @@@I want study@@@
```
compiles to the same document:
<pre>
Here's the sentence "I want to study" in ASLwrite:@@@I want study@@@</pre>

And these blocks can be multiple lines long. For example,
```
Let's countdown from three then say want:
@@@
num_3 num_2 num_1
want
@@@
```

renders as:

Let's countdown from three and then say want:
<pre>
@@@
num_3 num_2 num_1
want
@@@</pre>

## Try it yourself!

Can you add code below to count to 5 on the same line?

Count to five: *add your code here*

Next can you count to five, where each number gets its own line?

Count to five: *add your code here*

## Definitions continued

## A confession...
You may have noticed that the vocabulary I have included in the examples so far is very... limited.

It's true, I have only implemented a small number of signs.

Below is a table showing all handshapes, signs and diacritics currently implemented in ASLType.

### Handshapes
Check the handshapes tab above the editor to see a full list of the available handshapes.

### Signs
|name   |render |
|:-----:|-------|
|`I` or `me`|@me@|
|`want`|@want@|
|`study`|@study@|

### Diacritics
|name   |render |
|:-----:|-------|
|`~` or `flutter`|@~@|

*Note:* `flutter` is drawn above the grapheme, this is so that you can put any sign under it, but it sometimes creates weird visuals (like in the table above where it might appear to be inside the header row)

## But...!
Fear not, even if I don't create a handshape or a sign for you, ASLType is extendable!
I have implemented an entire programming language for defining new symbols.

Let's learn how to make our own drawings! 

*Tip: It may be helpful for you to turn on outlines in the settings while you are working on a new shape*

Start by looking at this block below:
@@@
{}
@@@
All it does is define an empty box. You make symbols by combining a series of drawing commands.

### Commands
Commands come in two flavors, **relative** and **absolute**. Lets play around with some *relative* commands first. Try adding this code:
```
@@@
{
  pendown
  forward 100
}
@@@
```
to the block below:

@@@
{

}
@@@

If you did it right you should see a line pointing to the right. Congrats, you just learned your first two commands, `pendown` and `forward`!
- `pendown` tells ASLType to draw a line where you move
- `forward` tells it to move forward

### Whats going on?!

In your head, imagine a turtle who lives on a sheet of paper. If she held a pen and walked forward she would leave a trail behind her. This is what **relative** commands do. They tell the turtle to walk around the page.

*Why 100?* You may be asking me. The paper the turtle lives on is 200 wide by 200 tall. You can think of it as 200 steps if thats a useful metaphor for you. But the turtle starts in the center of the screen at `(0, 0)`. 

If you haven't taken a math class in a while, recall that `(0, 0)` is a position that says how far the turtle has walked left-to-right (the x-axis) and top-to-bottom (the y-axis). So the turtle starts at `(0, 0)` and after calling `forward 100` she is at `(100, 0)`. If you told her to turn 90 degrees clockwise with "`turn 90`" and then walk forward another 100 units she would be at `(100, -100)` meaning she has taken 100 steps right, and 100 steps down.

Try to draw the rest of this square by making the turtle move:

*Tip: If you set the "Compiler Type" to "Debug HTML" in the settings menu you can actually see the turtle, drawn as a red arrow.*

@@@
{
  pendown
  forward 50
  turn 90
  forward 50
}
@@@

<details><summary>Click to reveal the solution</summary><pre>\@\@\@<br/>{<br/>  pendown<br/>  forward 50<br/>  turn 90<br/>  forward 50<br/>  turn 90<br/>  forward 50<br/>  turn 90<br/>  forward 50<br/>}<br/>\@\@\@</pre></details>

Arguably the most powerful command in ASLType is the `draw` command. It draws another drawing centered at the turtles position. This is how the @want@ sign works. It moves the turtle to each quadrent and then `draw`'s a handshape there. If you have debug mode on, you'll see that the "want" sign contains many smaller turtles.

As an example lets make the "you" sign. We already have @me@, but we can make "you" pretty easily. In the block below add the code `draw num_1`

@@@
{
  turn 180
  draw me
}
@@@

You should now see the pointing finger sign in the box. We can actually just draw me in box as well. Try replacing `num_1` with `me`. Now the only difference between "me" and "you" is the rotation, so before asking her to draw the "me" sign, ask her to turn 180 degrees. Your final code should look like
```
@@@
{
  turn 180
  draw me
}
@@@
```

You could also add this as a definition, if at the top you added the code:
```
you = {
  turn 180
  draw me
}
```
Then you could just say `@you@` anywhere in the document and it would draw the symbol.

*Note: If you wanted the arrow on the right of the finger, you'll learn later how to make the arrow from scratch and then you can put it wherever you want.*

A good thing to know is that draw can also change the size of the drawing. By default it will be drawn at the full 200 by 200 scale, but you can change the size. This code draws a number 5 at 200% 100% and 50% scale (400x400, 200x200, 100x100).
```
@@@
{
  draw num_5 400 400
}
{
  draw num_5 200 200
}
{
  draw num_5 100 100
}
@@@
```
@@@
{
  draw num_5 400 400
}
{
  draw num_5 200 200
}
{
  draw num_5 100 100
}
@@@

One more useful **relative** command to know is `flip`. It works just like draw, but the turtle gets its lefts and rights mixed up. This has the effect of turning any symbol into it's left-handed variant.
```
draw letter_A
```
@@@{draw letter_A}@@@

is a right-handed A, and 
```
flip letter_A
```
@@@{flip letter_A}@@@
is a left-handed A.

### Absolute Commands
Now, let's try out some **absolute** commands now. Here, **absolute** means the commands do not care about the *current position* of the turtle. One of the most useful **absolute** commands is `goto`. This tells the turtle to go to a specific location, no matter where it happens to be now.

Here's how to draw the box from before using `goto`
```
@@@
{
  pendown
  goto 50   0
  goto 50 -50
  goto  0 -50
  goto  0   0
}
@@@
```
*Note: I like to add extra spaces around each number so they line up in columns, this is not necessary at all, I just think it looks nice.*
@@@
{
  pendown
  goto 50   0
  goto 50 -50
  goto  0 -50
  goto  0   0
}
@@@

This information is enough to create the `want` sign from scratch!

```
@@@
{
  goto  -50   50
  draw num_5  85 85
  goto   50   50
  flip num_5  85 85
  goto  -50  -50
  draw claw_5 85 85
  goto   50  -50
  flip claw_5 85 85
  goto    0   50
  pendown
  goto    0  -40
  penup
  goto    0  -50
  pendown 
  goto    0  -55
}
@@@
```
@@@
{
  goto  -50   50
  draw num_5  85 85
  goto   50   50
  flip num_5  85 85
  goto  -50  -50
  draw claw_5 85 85
  goto   50  -50
  flip claw_5 85 85
  goto    0   50
  pendown
  goto    0  -40
  penup
  goto    0  -50
  pendown 
  goto    0  -55
}
@@@

Here I am just creating the dot on the arrow using a short line. But this is a perfectly good way to "spell" `want` in ASLType. But it is a little hard to read. Luckily you can leave yourself *comments* so you remember what you were doing later. you can add comments with two slashes, like this `// this is a comment`. ASLType just ignores anything in a comment so you can leave notes to yourself. For example you might prefer to write the previous code like this:
```
@@@
{
  // draw the handshapes
  goto  -50   50     // top-left
  draw num_5  85 85 
  goto   50   50     // top-right
  flip num_5  85 85 
  goto  -50  -50     // bottom-left
  draw claw_5 85 85
  goto   50  -50     // bottom-right
  flip claw_5 85 85
  
  // draw the arrow
  goto    0   50
  pendown
  goto    0  -40
  
  // draw the arrow head
  penup
  goto    0  -50
  pendown 
  goto    0  -55
}
@@@
```

Armed with your new knowledge, see if you can fix the arrow on the `you` sign we created earlier so it appears on the right of the finger.

@@@
{
  draw num_1
  // add your arrow here
}
@@@

### Curves
Look closely at the 5 claw symbol 
@@@
claw_5
@@@
You'll notice the back of the shape is curved. And if you still have debug mode on you'll see extra green and blue lines (You may have to increase the glyph size in settings to see the debug info clearly).

This is a kind of curve called a [Cubic Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). The math behind them is super cool, but for now we just care about how to use them. It takes a little to get used to the syntax, but that "7" shape with the curve is defined like this in handshapes.asl:
```
_big_7 = {
  goto -66 100
  pendown
  goto 66 100
  curveto 0 -100   50 0   8 0
}
```
*Note: the `_` in front of the name is a convention I use to keep track of what names define a real symbol and what names just define a piece of a symbol. So `claw_5` has no underscore prefix, but `_big_7` which is just a piece of a symbol does have one.*

We can look at the shape just like any other:
@@@
_big_7
@@@

Let's break down what the `curveto` command does. First the numbers that you give to `curveto` are in three groups of 2. 

```
curveto x y    cx1 cy1    cx2 cy2
```

The first two, `x` and `y` give the end of the curve, think of them like the `x` and `y` for `goto`, they define where the turtle will end up. The function also takes two "control points", `c1=(cx1, cy1)` and `c2=(cx2, cy2)`. The point `c1` is shown in blue in the debug view, and `c2` is shown in green. You can think they tell the turtle to adjust her path towards them as she walks to her final destination. 

The easiest way to understand it is to play around, so try changing the control points below and see how the curve changes:
@@@
{
  goto -75 75
  pendown

  //       x   y     cx1 cy1     cx2  cy2
  curveto 75 -75      75  75     -75  -75
}
@@@

If you want a circular (or elliptical) curve you can use `arcto`. Which acts just like `curveto` but you supply a radius instead of control points.

```
@@@
{
  goto -75 75
  pendown
  //     x   y   r   
  arcto 75 -75 200
}
@@@
```
@@@
{
  goto -75 75
  pendown
  //     x   y   r   
  arcto 75 -75 200
}
@@@

You can change the direction by adding a fourth number that is either `-1` for clockwise or `1` for counter-clockwise. 
```
@@@
{
  goto -75 75
  pendown
  //     x   y   r  direction
  arcto 75 -75 200         -1
}
@@@
```
@@@
{
  goto -75 75
  pendown
  //     x   y   r  direction
  arcto 75 -75 200         -1
}
@@@

If you set the radius smaller than is possible it sets it to the minimum possible size
```
@@@
{
  goto -75 75
  pendown
  //     x   y   r  direction
  arcto 75 -75   5         -1
}
@@@
```
@@@
{
  goto -75 75
  pendown
  //     x   y   r  direction
  arcto 75 -75   5         -1
}
@@@

You can also use the `largearcto` command in exactly the same way, but it will create the larger arc if one exists:
```
@@@
{
  goto -75 -75
  pendown
  //      x   y   r
  arcto -75  75   100
}
{
  goto -75 -75
  pendown
  //           x   y   r
  largearcto -75  75   100
}
@@@
```
@@@
{
  goto -75 -75
  pendown
  //      x   y   r
  arcto -75  75   100 200
}
{
  goto -75 -75
  pendown
  //           x   y   r
  largearcto -75  75   100
}
@@@

One last word on curves. Often you want multiple curves to go after one another, and you want them to look smooth. Consider these curves:
```
@@@
{
  goto -75 75
  pendown

  //        x   y     cx1  cy1     cx2   cy2
  curveto  75   0      75   75      75    50
  curveto -75 -75      50  -75     -50   -75
}
@@@
```
@@@
{
  goto -75 75
  pendown

  //        x   y     cx1  cy1     cx2   cy2
  curveto  75   0      75   75      75    50
  curveto -75 -75      50  -75     -50   -75
}
@@@
There's a kink where they connect. Maybe we want that as in, @letter_o@, but not always. In this case we can fix it by changing the second curves first control point.

```
@@@
{
  goto -75 75
  pendown

  //        x   y     cx1  cy1     cx2   cy2
  curveto  75   0      75   75      75    50
  curveto -75 -75      75  -75     -50   -75
}
@@@
```
@@@
{
  goto -75 75
  pendown

  //        x   y     cx1  cy1     cx2   cy2
  curveto  75   0      75   75      75    50
  curveto -75 -75      75  -50     -50   -75
}
@@@
Now it looks much smoother. But there is also a `smoothto` command which works just like `curveto` but it only needs the second control point, the first one is computed automatically from the previous one. Here's an example:

```
@@@
{
  goto -75 75
  pendown

  //         x   y     cx1  cy1     cx2   cy2
  curveto   75   0      75   75      75    50
  smoothto -75 -75                  -50   -75
}
@@@
```
@@@
{
  goto -75 75
  pendown

  //         x   y     cx1  cy1     cx2   cy2
  curveto   75   0      75   75      75    50
  smoothto -75 -75                  -50   -75
}
@@@
which gives us the same shape for free.

### Command Reference

Here is a list of all the commands, and how they work

|command|description|example|
|-|-|-|
|`forward <amount>`|Moves the turtle in the direction she's facing. <br/>`<amount>` can be negative, which means to walk back|`forward 100`|
|`turn <angle>`|Turns the turtle a certain number of degrees. <br/>`<angle>` can be negative, which means to turn counter-clockwise|`turn 90`|
|`draw <grapheme>`|Has the turtle draw the grapheme at its current position. |`draw num_5`|
|`draw <grapheme> <width> <height>`|Has the turtle draw the grapheme at its current position. In a box that is `<width>` by `<height>` instead of 200 by 200. |`draw num_5 100 100`|
|`flip <grapheme>`|Same as `draw` but flips the symbol left-to-right.<br/>Also has a `<width> <height>` variant |`flip num_5`|
|`goto <x> <y>`|Sends the turtle to `(<x>, <y>)` no matter where it currently is.<br/>`<x>` and `<y>` go between -100 and 100. |`goto 50 50`|
|`curveto <x> <y> <cx1> <cy1> <cx2> <cy2>`|Sends the turtle to `(<x>, <y>)` no matter where it currently is.<br/>Creates a Cubic Bézier curve between the turtles current position and `(<x>, <y>)`, controlled by `c1=(cx1, cy1)` and `c2=(cx2, cy2)` |`curveto 75 -75 75 75 -75  -75`|
|`arcto <x> <y> <r> <dir>`|Sends the turtle to `(<x>, <y>)` no matter where it currently is.<br/>Creates an arc of radius `<r>` between the turtles current position and `(<x>, <y>)`.<br/>`<dir>` is optional, but if it is positive the turtle walks counter-clockwise, and clockwise if negative. |`arcto -75  75   100`|
|`largearcto <x> <y> <r> <dir>`|Same as `arcto` but creates the larger arc, if one exists. |`largearcto -75  75   100`|
|`arcto <x> <y> <rx> <ry> <dir>`|Same as `arcto`, but creates an elliptical arc with x-radius `<rx>` and y-radius `<ry>`.<br/>The `<dir>` flag is not optional in this mode. |`arcto -75  75   100 200 1`|
|`largearcto <x> <y> <rx> <ry> <dir>`|Same as `largearcto`, but creates an elliptical arc with x-radius `<rx>` and y-radius `<ry>`.<br/>The `<dir>` flag is not optional in this mode. |`largearcto -75  75   100 200 1`|
|`smoothto <x> <y> <cx> <cy>`|Same as `curveto` but the first control point is computed automatically and `(<cx>, <cy>)` is used as the second control point.|`smoothto 75 -75 -75  -75`|

Now that you've spent some time working through drawing commands, there are just a few more things to learn about ASLType.

## Math
So far in ASLType we have been computing numbers manually, sometimes it is helpful to have the computer so some math for us. In ASLType anywhere that expects a number, you can have the computer evaluate an expression using a `#` and parentheses. For example:
```
goto 0 #(100 / 2)
```
is equivalent to
```
goto 0 50
```

ASLType knows: `+`, `-`, `*`, and `/`.

## Definitions/Variables
In the definitions section you have seen that you can create names for graphemes, like:

```
you = {
  turn 180
  draw me
}
```
This is called a variable. Variables are assignments of names to values, so after the above code ASLType knows that when you say `you` you mean the code that draws that symbol.

You can also create number variables like `x = 10`, and then use them like `forward 10`. 

*Note: You can be explicit and use the math evaluation expression like `x = #(10)` or `forward #(x)` but for single variables or numbers it is optional*.

*Currently* you cannot define variables inside a definition, as in:
```
g = {
  x = 10
  y = 20
  goto x y
  draw num_5
}
```
but, that is planned for the future.

## Functions

The last thing you need to learn is functions. A function is a special type of definition that changes what it does based on what input you give it (like commands!). 

There are two kinds of functions, **numeric functions** and **grapheme functions**.

### Numeric Functions

Numeric Functions are functions that compute numbers, heres a simple example:

```
square(x) = #(x * x)
```

This function computes the square of a number, so in a command you can say `forward square(5)` to move forward 25 steps.

Functions can have multiple arguments as well, so you could say:

```
sum(a b c) = #(a + b + c)
```
to add three numbers together.

### Grapheme Functions

Grapheme functions are arguably more useful, they let you define custom commands. We saw earlier how to "spell" `want`, but that's not actually how I do it in `vocab.asl`. Heres the code for that:

```
want = {
  draw quad_layout(
    num_5          {flip num_5} 
    {flip claw_5}  claw_5
  )
  goto 0 50
  draw arrow_to_me
}
```

I use a custom function `quad_layout` which takes in four graphemes and draws them in the four quadrants. Now under the hood this does the same thing, which you can see by looking at how `quad_layout` is defined:

```
quad_layout(a b c d) = {
  goto -50 +50
  draw a 85 85
  
  goto +50 +50
  draw b 85 85
  
  goto -50 -50
  draw c 85 85
  
  goto +50 -50
  draw d 85 85
}
```

This looks a lot like the code we wrote for `want` earlier. But putting it in a function lets us use it again, for example this is how I wrote `study`:

```
study = quad_layout(
  {}                      {turn -160; draw num_5; draw ~}
  {turn 75; draw close_5} {}
)
```

One more thing to note, is that grapheme functions can take in graphemes or numbers, so you could define a function:

```
move_right(g x) = {
  forward x
  draw g
}
```

which draws a grapheme further to the right. You would call this like:

```
right_E = move_right(letter_E 10)
```

or

```
right_E = {
  draw move_right(letter_E 10)
}
```

## Take a deep breath...
If you actually read this whole document pat yourself on the back, it was a lot. If you have any questions/comments/suggestions feel free to ask me on the forum. I hope you found this interesting, and at least somewhat easy to follow. I'm a programmer so it's hard for me to tell how easy it is for a non-programmer to understand ;)