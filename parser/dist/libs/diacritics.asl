/*
+--------------------------------+
| diacritics.asl defines symbols |
| for the ASLwrite diacritics    |
+--------------------------------+
*/

~ flutter = {
  penup
  goto -100 120
  pendown
  curveto -50 120 -90 140 -60 140
  curveto   0 120 -40 140 -10 140
  curveto  50 120  10 140  40 140
  curveto 100 120  60 140  90 140
}
===
@~@