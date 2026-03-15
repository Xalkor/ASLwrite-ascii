square = {
  goto -100 100
  pendown
  forward 200
  turn 90
  forward 200
  turn 90
  forward 200
  turn 90
  forward 200
}
two_by_two = {
  goto -50 -50
  draw square 20 20
  goto +50 -50
  draw square 20 20
  goto -50 +50
  draw square 20 20
  goto +50 +50
  draw square 20 20
}
---
square
two_by_two