me,i = {
    [rotate 180; draw 1-num;];
    right 0.5;
    arrow -. down;
};

study = {
    [
        rotate 90; 
        flip; 
        draw 5-close
    ];
    right 0.5;
    up 0.5;
    [rotate -135; draw 5-num; up; draw ~]
};

asl = 10_a 10_s 1_thumb;

i study asl