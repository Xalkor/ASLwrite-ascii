/*
+------------------------+
| vocab.asl defines many |
| simple asl signs.      |
+------------------------+
*/

import diacritics
import handshapes
import arrows

I,me = {
  [turn 180; draw num_1]
  goto 30 10
  draw arrow_to_me
}
want = {
  goto -50 +50
  draw num_5 85 85
  
  goto +50 +50
  [flip; draw num_5 85 85]
  
  goto -50 -50
  [flip; draw claw_5 85 85]
  
  goto +50 -50
  draw claw_5 85 85
  
  goto 0 50
  draw arrow_to_me
}
study = {
  goto -50 -50
  [turn 75; draw close_5 85 85]
  goto 50 50
  [turn -170; flip; draw num_5 85 85; draw ~ 85 85]
}
===
@I want study@