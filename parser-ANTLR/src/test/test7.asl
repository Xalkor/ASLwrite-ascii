5_claw = {
    w = 2; h = 3;
    size w h;
    stroke 0.1;

    pad = 0.25;
    curve_offset = 0;

    left = pad; right = w-pad; mid_x = w / 2;
    bottom = pad; top = h-pad; mid_y = h / 2 + 0.25;

    low_top = top-pad;
    high_bottom = bottom+1;
    short_left = left+pad;

    goto left top;

    pen down;
    goto right top;
    goto mid_x bottom curve right (top - curve_offset) mid_x (bottom + curve_offset);
    goto mid_x mid_y;
    goto left mid_y;
    pen up;

    goto mid_x low_top;

    pen down;
    goto left low_top;
    pen up;

    goto mid_x high_bottom;

    pen down;
    goto short_left high_bottom;
};

5_claw