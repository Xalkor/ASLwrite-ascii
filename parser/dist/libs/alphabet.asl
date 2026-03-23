/*
+---------------------------------------+
| alphabet.asl defines single letter    | 
| aliases for handshapes that represent |
| English letters.                      |
+---------------------------------------+
*/

import handshapes
import arrows

floor(glyph y) = { goto 0 y; draw glyph }

letter_a letter_A = floor(a_10 -70)
letter_b letter_B = close_4
letter_c letter_C = floor(c_5 -25)
letter_d letter_D = d_1
letter_e letter_E = {
  goto -100 0
  pendown 
  arcto 100 0 50
  goto -100 0

  penup
  goto -75 -100
  pendown
  goto 75 25
}
letter_f letter_F = num_9
letter_g letter_G = floor(g_20 -55)
letter_h letter_H = floor(bend_2 -55)
letter_i letter_I = floor(i_1 -55)
letter_j letter_J = { [turn -90; flip i_1 200 150]; draw _ellipse(75 0 15 15) }
letter_k letter_K = k_3
letter_l letter_L = thumb_1
letter_m letter_M = floor(m_3 -40)
letter_n letter_N = floor(n_2 -40)
letter_o letter_O = floor(num_0 -50)
letter_p letter_P = floor({ turn -90; draw k_3 } -50)
letter_q letter_Q = { turn -90; draw g_20 }
letter_r letter_R = cross_2
letter_s letter_S = floor(s_10 -20)
letter_t letter_T = floor(t_10 -50)
letter_u letter_U = close_2
letter_v letter_V = num_2
letter_w letter_W = num_6
letter_x letter_X = claw_1
letter_y letter_Y = floor(inverse_6 -75)
letter_z letter_Z = {
  draw num_1
  goto 20 100
  pendown
  goto 60 100
  goto 20 60
  goto 60 60
  penup
  forward 15
  draw dot 24 24
}
===

# Lets look at the English alphabet in ASLwrite:

`A:`@letter_A@ `B:`@letter_B@ `C:`@letter_C@ `D:`@letter_D@ `E:`@letter_E@ `F:`@letter_F@ 

`G:`@letter_G@ `H:`@letter_H@ `I:`@letter_I@ `J:`@letter_J@ `K:`@letter_K@ `L:`@letter_L@ 

`M:`@letter_M@ `N:`@letter_N@ `O:`@letter_O@ `P:`@letter_P@ `Q:`@letter_Q@ `R:`@letter_R@ 

`S:`@letter_S@ `T:`@letter_T@ `U:`@letter_U@ `V:`@letter_V@ `W:`@letter_W@ `X:`@letter_X@ 

`Y:`@letter_Y@ `Z:`@letter_Z@