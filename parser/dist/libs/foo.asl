/*
+------------------------------+
| foo.asl is a library to test |
| the import capabilities of   |
| the ASLType parser           |
+------------------------------+
*/

F = {
    penup
    goto -25 -75
    pendown
    face -90
    forward 150
    turn 90
    forward 50
    penup
    goto -25 25
    pendown
    forward 35
}

O = {
    penup
    goto -25 -75
    pendown
    face -90
    forward 150
    turn 90
    forward 50
    turn 90
    forward 150
    turn 90
    forward 50
}

foo = {
    forward -65
    draw F
    forward 65
    draw O
    forward 65
    draw O
}

===
The foo symbol: @foo@
