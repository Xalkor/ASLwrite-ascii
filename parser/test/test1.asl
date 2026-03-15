num_1 = {
  # vertical line
  goto 0 -100
  pendown
  face -90
  forward 200
  # cross
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
_thumb = {
  penup
  goto -15 -50
  pendown
  face 180
  forward 40
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
  # outer handshape
  goto -66 100
  pendown
  goto 66 100
  goto 0 -100
  penup
  # vertical line
  goto 0 -100
  pendown
  face -90
  forward 133
  turn -90
  forward 66
  # thumb
  penup
  goto 0 -33
  pendown
  face 180
  forward 33
  # extra finger
  penup
  goto -66 66
  pendown
  face 0
  forward 66
}
_dot = {
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
want = {
  goto -50 +50
  draw num_5 85 85
  
  goto +50 +50
  draw num_5 85 85
  
  goto -50 -50
  draw claw_5 85 85
  
  goto +50 -50
  draw claw_5 85 85
  
  goto 0 50
  face 90
  pendown
  forward 75
  penup
  forward 16
  draw _dot 16 16
}
countdown = num_3 num_2 num_1;
---
num_1 num_2 num_3 num_4 num_5
countdown
claw_5
want