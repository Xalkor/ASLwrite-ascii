/*
+------------------------+
| vocab.asl defines many |
| simple asl signs.      |
+------------------------+
*/

import diacritics
import handshapes
import arrows
import layouts

I me = {
  [turn 180; draw num_1]
  goto 30 10
  draw arrow_to_me
}
want = {
  draw quad_layout(
    num_5          {flip num_5} 
    {flip claw_5}  claw_5
  )
  goto 0 50
  draw arrow_to_me
}
study = quad_layout(
  {}                      {turn -160; draw num_5; draw ~}
  {turn 75; draw close_5} {}
)

===
@I want study@