/*
+-------------------------------+
| layouts.asl defines functions | 
| for various grapheme layouts  |
+-------------------------------+
*/

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
===