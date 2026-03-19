/*
+-----------------------------------+
| foobar.asl is a library to test   |
| the recursive import capabilities |
| of the ASLType parser             |
+-----------------------------------+
*/

B = {
    penup
    goto -25 -75
    pendown
    face -90
    forward 150
    turn 90
    forward 50
    turn 90
    forward 37.5
    turn 45
    forward 53.03
    turn -90
    forward 53.03
    turn 45
    forward 37.5
    turn 90
    forward 50
}
A = {
    penup
    goto -25 -75
    pendown
    face -90
    forward 150
    turn 90
    forward 50
    turn 90
    forward 150
    penup
    goto -25 25
    pendown
    face 0
    forward 50
}
R = {
    penup
    goto -25 -75
    pendown
    face -90
    forward 150
    turn 90
    forward 50
    turn 90
    forward 50
    turn 90
    forward 50
    goto 25 -75
}

bar = {
    forward -65
    draw B
    forward 65
    draw A
    forward 65
    draw R
}

import foo
foobar = foo bar;
===
foo should be imported: @foo@
we should also have @bar@
and of course foobar: @foobar@