me,i = {
    [rotate 180; draw 1-num;]
    right 0.5;
    arrow -. down;
} 3-num {
    up 90
    rotate 12
    right 20
    draw 5-claw
};

study = {
    [
        rotate 90; 
        flip; 
        draw 5-close
    ]
    right 0.5;
    up 0.5;
    [rotate -135; draw 5-num; up; draw ~]
};

asl = 10-a 10-s 1-thumb;

i study asl { up; rotate 24; [right -20; draw @] } another few words