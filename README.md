options:{
    width：宽度基准值，默认1920
    height：高度基准值，默认1080
}

编译标识：
vw：将转成以宽度为基准的百分比
vh：将转成以高度为基准的百分比

编译前：index.css
.btn{
   width:192vw; 
   height:108vh;
   border:10px solid grey;
}


编译后：index.css
.btn{
    width:10vw;
    height:10vh;
    border:10px solid grey;
}

