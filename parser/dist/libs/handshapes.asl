/*
+----------------------------+
| handshapes.asl defines the | 
| ASLwrite digibet           |
+----------------------------+
*/

// Elements, used in many handshapes
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
  goto -16.5 -50
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
_big_u = {
  goto -50 100
  pendown
  curveto  0 -100   -50 20   -55 -100
  smoothto 50 100   50 20
}
_whistle = {
  goto -100 30
  pendown
  goto 50 30
  curveto  40 -45    120 30   120 -45
  smoothto 50  10    -10 54
}
_small_whistle = {
  goto -120 30
  pendown
  goto 65 30
  curveto  65 -45    110 30   110 -45
  smoothto 75  10     30 54
}
_round_whistle = {
  goto     0   100
  pendown
  curveto  0  -100      45    0     75 -100
  curveto 27     0    -100 -100    -15   55 
}
_big_round_whistle = {
  goto     -50   100
  pendown
  curveto   0  -100    -50    0   -65 -100
  curveto -50   -25    150 -100    55   35 
}
_pinky = {
  goto    75 0
  pendown
  curveto 75 100    85 50    85 50
}
_big_7 = {
  goto -66 100
  pendown
  goto 66 100
  curveto 0 -100   50 0   8 0
}
_small_7 = {
  goto 0 -100
  pendown
  face -90
  forward 133
  turn -90
  forward 66
}
_ellipse(cx cy r R) = {
    penup
    goto  #(cx - r) cy
    pendown
    arcto #(cx + r) cy r R 1
    arcto #(cx - r) cy r R 1
}
// 0
num_0 = {
  goto -100 0
  pendown
  curveto   100 0   0  85   100 75
  smoothto -100 0   0 -85
}

// 1
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
claw_1 = {
  goto       -50  100
  pendown
  goto        50  100
  goto        50 -100
  largearcto  50  40   75   -1
}
d_1 = {
  draw _round_whistle
}
i_1 = {
  goto 100 75
  pendown
  goto 100 50
  curveto  -100   0   0  66   -100 50
  smoothto  100 -50   0 -66
}
thumb_1 = {
  draw _big_round_whistle
  goto     -50    -25
  pendown
  curveto -100   -100 -90   -60 
}

// 2
num_2 = {
  draw _big_v
  draw _cross
}
bend_2 = {
  draw _whistle
  goto -100 15
  pendown
  goto -15 15
}
_n_2 = {  // Getting the shape right
  draw _whistle
  goto -100 45
  pendown
  goto 45 45
}
n_2 = { // the default "n" is turned
  goto 5 -15
  turn -45
  draw _n_2
}
claw_2 = {
  draw _big_7
  draw _small_7
  goto 0 30
  draw _cross
}
close_2 = {
  turn -90
  flip bend_2
}
cross_2 = {
  goto -66 100
  pendown
  curveto   0  -100  66 -66 50 -100
  smoothto 50   100 -66 -66
}

// 3
num_3 = {
  draw _big_v
  draw _thumb
}
k_3 = {
  draw _round_whistle
  goto 15 25 
  pendown
  curveto -55 45 -12 45
}
_m_3 = {
  draw _n_2
  goto -100 60
  pendown
  goto 45 60
}
m_3 = {
  goto 5 -15
  turn -45
  draw _m_3
}

// 4
num_4 = {
  draw _big_v
  draw _small_v
  draw _cross
}
close_4 = {
  draw _big_u
  goto 0 20
  draw _cross 300 300
}

// 5
num_5 = {
  draw _big_v
  draw _small_v
  draw _thumb
}
claw_5 = {
  draw _big_7
  penup
  draw _small_7
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
close_5 = {
  draw _big_u

  penup
  goto -26 0
  draw _thumb
}
half_5 = {
  goto    -100  35
  pendown
  goto      20  35
  curveto   35 -55    125 35   
  penup
  
  goto    -85  10
  pendown
  goto     35  10
  curveto  -5 -45    55 10   
  pendown
}
bend_5 = {
  goto -100  35
  pendown
  goto   30  35
  goto   30 -35
  goto  100  35
}
c_5 = {
  goto     -66  25
  pendown
  arcto     66  25  80  -1
  curveto    0 -80  90 -15 75 -35
  goto     -65 -25
}

// 6
num_6 = {
  draw _big_v
  draw _cross
  goto 0 -100
  pendown
  goto 0 100
}
inverse_6 = {
  [ 
    flip
    turn 90
    goto -38 0
    draw _round_whistle 125 125
  ]
  goto 30 -28
  pendown
  curveto 100 -5 70 -28
}

// 7
combo_7_8 = {
  draw _big_round_whistle
  draw _pinky
}

// 8
num_8 = {
  [turn #(90+25); draw _small_whistle]
  goto 10 -50
  pendown
  goto -66 95
}
open_8 = {
  draw _big_v
  goto 0 -25
  draw _small_7 200 150
}

// 9
num_9 = {
  draw _round_whistle
  goto -20 0
  draw _pinky
}

// 10
num_10 = {
  goto -100 -40
  pendown
  goto 100 -40
  arcto -50 -40 50
}
a_10 = {
  draw _ellipse(0 0 85 40)
  goto -85 0
  pendown
  curveto  -40 75   -85 30
  goto    -100 50
}
s_10 = {
  draw _ellipse(0 0 85 85)
  goto -85 0
  pendown
  curveto  0 0   -60 20
}
t_10 = {
  goto     -100  50
  pendown
  curveto   100    0    100  55
  smoothto   20  -50    100 -55
  smoothto  -50  100    -50   0
}

// 20
num_20 = {
  draw num_0
  draw _ellipse(60 0 40 50)
}
claw_20 = {
  draw c_5
  draw _ellipse(36 -5 40 40)
}
g_20 = {
  draw _ellipse(61 -2 40 44)
  goto     -100  50
  pendown
  curveto   100    0    70   50     100  50
  curveto   -20  -50    100 -50     70  -50     
}

===
# A dictionary of handshapes currently supported by ASLType
Named and Organized according to the [**ASL handshape chart**](https://www.handspeak.com/learn/438/) by HandSpeak

|0-handshapes|
|:----------:|
|`num_0`     |
|@num_0@     |

<br/>

|1-handshapes|        |     |     |         |
|:----------:|:------:|:---:|:---:|:-------:|
|`num_1`     |`claw_1`|`d_1`|`i_1`|`thumb_1`|
|@num_1@     |@claw_1@|@d_1@|@i_1@|@thumb_1@|

*Notes:*
- HandSpeak groups `thumb_1`, with the 20 handshapes&mdash;which makes sense&mdash;but it makes more sense to me to group it with the 1 handshapes since it's called `thumb_1`.

<br/>

|2-handshapes|        |     |        |         |         |
|:----------:|:------:|:---:|:------:|:-------:|:-------:|
|`num_2`     |`bend_2`|`n_2`|`claw_2`|`close_2`|`cross_2`|
|@num_2@     |@bend_2@|@n_2@|@claw_2@|@close_2@|@cross_2@|

*Notes:* 
- HandSpeak does not differentiate between `bend_2` and `n_2`, but ASLwrite does. I have decided to call the handshape for the letter "n", `n_2`.
- HandSpeak gives: @bend_2@ (`bend_2`) a different name than @close_2@ (`close_2`). But in ASLwrite they are the same symbol just flipped and rotated, so you can easily spell @close_2@ as `{turn -90; flip bend_2}`

|3-handshapes|     |
|:----------:|:---:|
|`num_3`     |`k_3`|
|@num_3@     |@k_3@|

*Notes:*
- HandSpeak defines a `3-claw`, `3-close`, and `3-flat`, I am not sure what the ASLwrite equivalent of these symbols would be.

<br/>

|4-handshapes|         |
|:----------:|:-------:|
|`num_4`     |`close_4`|
|@num_4@     |@close_4@|


*Notes:*
- HandSpeak defines a `4-claw`, I am not sure what the ASLwrite equivalent of this symbol would be.

<br/>

|5-handshapes|         |        |        |        |     |
|:----------:|:-------:|:------:|:------:|:------:|:---:|
|`num_5`     |`close_5`|`claw_5`|`half_5`|`bend_5`|`c_5`|
|@num_5@     |@close_5@|@claw_5@|@half_5@|@bend_5@|@c_5@|

<br/>

|6-handshapes|           |
|:----------:|:---------:|
|`num_6`     |`inverse_6`|
|@num_6@     |@inverse_6@|

*Notes:*
- HandSpeak defines a `6-claw`, I am not sure what the ASLwrite equivalent of this symbol would be.

<br/>

|7-handshapes|
|:----------:|
|`combo_7_8` |
|@combo_7_8@ |

*Notes:*
- HandSpeak defines a `7-num`, I am not sure what the ASLwrite equivalent of this symbol would be.
- The @combo_7_8@ handshape, is called `7-8` by HandSpeak. Since names cannot start with digits in ASLType, I have added the "combo" prefix.

<br/>

|8-handshapes|        |
|:----------:|:------:|
|`num_8`     |`open_8`|
|@num_8@     |@open_8@|

*Notes:*
- HandSpeak defines a `8-num`, I am not sure what the ASLwrite equivalent of this symbol would be.

<br/>

|9-handshapes|
|:----------:|
|`num_9`     |
|@num_9@     |

<br/>

|10-handshapes|      |      |      |
|:-----------:|:----:|:----:|:----:|
|`num_10`     |`a_10`|`s_10`|`t_10`|
|@num_10@     |@a_10@|@s_10@|@t_10@|

<br/>

|20-handshapes|         |      |
|:-----------:|:-------:|:----:|
|`num_20`     |`claw_20`|`g_20`|
|@num_20@     |@claw_20@|@g_20@|