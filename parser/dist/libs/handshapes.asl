/*
+----------------------------+
| handshapes.asl defines the | 
| ASLwrite digibet           |
+----------------------------+
*/

num_1 = {
  // vertical line
  goto 0 -100
  pendown
  face -90
  forward 200
  // cross
  penup
  goto -40 -66
  pendown
  goto 40 -33
}

_big_v = {
  penup
  goto -66 100
  pendown
  goto 0 -100
  goto 66 100
}
_small_v = {
  penup
  goto -33 100
  pendown
  goto 0 0
  goto 33 100
}
_thumb = {
  penup
  goto -15 -50
  pendown
  face 180
  forward 40
}
_cross = {
  penup
  goto -45 -66
  pendown
  goto 55 -33
}
num_2 = {
  draw _big_v
  draw _cross
}
num_3 = {
  draw _big_v
  draw _thumb
}
num_4 = {
  draw _big_v
  draw _small_v
  draw _cross
}
num_5 = {
  draw _big_v
  draw _small_v
  draw _thumb
}
claw_5 = {
  // outer handshape
  goto -66 100
  pendown
  goto 66 100
  goto 0 -100
  penup
  // vertical line
  goto 0 -100
  pendown
  face -90
  forward 133
  turn -90
  forward 66
  // thumb
  penup
  goto 0 -33
  pendown
  face 180
  forward 33
  // extra finger
  penup
  goto -66 66
  pendown
  face 0
  forward 66
}
_big_u = {
  goto -50 100
  pendown
  curveto  0 -100 -50   20 -60 -100
  curveto 50  100  60 -100  50   20 
}
close_5 = {
  draw _big_u

  penup
  goto -30 0
  draw _thumb
}
===
1-handshapes
@@@
num_1
@@@

2-handshapes
@@@
num_2
@@@

3-handshapes
@@@
num_3
@@@

4-handshapes
@@@
num_4
@@@

5-handshapes
@@@
num_5 claw_5 close_5
@@@