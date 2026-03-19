/*
+---------------------------------+
| arrows.asl defines some basic   | 
| arrow shapes for movement marks |
+---------------------------------+
*/

dot = {
  penup
  goto -10 10
  pendown
  forward 20
  turn 90
  forward 20
  turn 90
  forward 20
  turn 90
  forward 20
}
arrow_to_me = {
  pendown
  face 90
  forward 75
  penup
  forward 16
  draw dot 16 16
}
===
@dot arrow_to_me@