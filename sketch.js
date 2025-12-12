
let uX, uY; // タッチしているポイントの座標
let cX, cY; // 回転検出のセンター座標
let pX, pY; // 表示のセンター座標
let circle_in, circle_out; // タッチする円の内径、外径
let circle_out2;
let rect_length,rect_width; // 表示する四角の長さと幅
let touch_onoff;
let ball_size;
let count = 0;

let img = []; // 画像の配列をつくる
let snd = []; // 音の配列
let snd_timing = []; // 音のタイミング
let snd_timing2 = []; // 音のタイミング
let index = 0;
let index_old;

let a,d;
let image_no = 0;
let image_no_max = 10;

let frame_angle = 20;

let sc = 1.0;

// 画像を読み込む
function preload() 
{
  img[0] = loadImage("image00002.jpg"); 
  img[1] = loadImage("image00003.jpg"); 
  img[2] = loadImage("image00004.jpg"); 
  img[3] = loadImage("image00005.jpg"); 
  img[4] = loadImage("image00006.jpg"); 
  img[5] = loadImage("image00007.jpg"); 
  img[6] = loadImage("image00008.jpg"); 
  img[7] = loadImage("image00009.jpg"); 
  img[8] = loadImage("image00011.jpg");
  img[9] = loadImage("image00001.jpg");
  img[10] = loadImage("image00010.jpg");
  
  snd[0] = loadSound('01.wav');
  snd[1] = loadSound('02.wav');
  snd[2] = loadSound('03.wav');
  snd[3] = loadSound('04.wav');
  snd[4] = loadSound('05.wav');
  snd[5] = loadSound('06.wav');
  snd[6] = loadSound('07.wav');
  snd[7] = loadSound('08.wav');
  snd[8] = loadSound('09.wav');
  snd[9] = loadSound('10.wav');
  snd[10] = loadSound('11.wav');
  
  snd_timing[0] = 0;
  snd_timing[1] = 0;
  snd_timing[2] = 12;
  snd_timing[3] = 0;
  snd_timing[4] = 0;
  snd_timing[5] = 13;
  snd_timing[6] = 0;
  snd_timing[7] = 4;
  snd_timing[8] = 7;
  snd_timing[9] = 0;
  snd_timing[10] = 0;
  
  snd_timing2[0] = 9;
  snd_timing2[1] = 20;
  snd_timing2[2] = 20;
  snd_timing2[3] = 9;
  snd_timing2[4] = 20;
  snd_timing2[5] = 20;
  snd_timing2[6] = 20;
  snd_timing2[7] = 20;
  snd_timing2[8] = 20;
  snd_timing2[9] = 20;
  snd_timing2[10] = 20;
}

function setup() 
{

  //スクロールを固定
  
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  createCanvas(windowWidth, windowHeight);
  ww = windowWidth;
  wh = windowHeight;
  
  angleMode(DEGREES); // 角度の単位をradianからdegreeに変更
  
  a = 0;
  sc = 1.5;
}

function draw() 
{
  background(255);
  
  // タッチがある場合はタッチ座標を使用し、ない場合はマウス座標を使用

     if (touches.length > 0) {
        uX = touches[0].x;
        uY = touches[0].y;
       
      } else {
        uX = mouseX;
        uY = mouseY;
      }

  //画面の縦横どっちが長いかで表示位置を変える
  if(ww < wh)
  {
    cX = ww/2;
    cY = wh/6*5;
    pX = ww/2;
    pY = wh/6*2;
    if(touch_onoff)
    {
      circle_in = ww/3*sc;
      circle_out = ww/5*sc;
      circle_out2 = ww/10*sc;
    }
    else
    {
      circle_in = ww/3*0.95*sc;
      circle_out = ww/5*1.05*sc;
      circle_out2 = ww/10*1.05*sc;
    }
    rect_length = ww*0.8;
    rect_width = ww*0.1;
    ball_size = ww*0.06*sc;
  }
  else
  {
    cX = ww/6*5;
    cY = wh/2;
    pX = ww/6*2;
    pY = wh/2;
    if(touch_onoff)
    {
      circle_in = wh/3*sc;
      circle_out = wh/5*sc;
      circle_out2 = wh/7*sc;
    }
    else
    {
      circle_in = wh/3*0.95*sc;
      circle_out = wh/5*1.05*sc;
      circle_out2 = wh/7*1.05*sc;
    }
    rect_length = wh*0.8;
    rect_width = wh*0.1;
    ball_size = wh*0.06*sc;
  }
    
  
  // 原点に対するマウスの座標を取得
  let x = uX - cX;
  let y = uY - cY;

  d = dist(uX, uY, cX, cY);
  
  if(d < circle_in)
  {
    // マウスと原点の間の角度を計算 -180〜180度
    a = atan2(y, x);
  }

  push();
  // 原点を中心に移動
  translate(pX, pY + count*3.5);

  // 回転
  frame_angle = 20;
  if(image_no == 10) frame_angle = 30;
  
  rotate((int)((a+180)/frame_angle)*frame_angle+180+frame_angle/2);
  index = (int)((a+180)/frame_angle);
  
  push();

  if(ww < wh)
  {
    scale(ww/img[0].width*0.95 + count*0.005);
  }
  else
  {
    scale(wh/img[0].width*0.95 + count*0.005);
  }

  push();
  rotate(90);
  
  // 驚き盤画像を描画 画像の中心を原点に
  image(img[image_no], -img[image_no].width/2,-img[image_no].height/2);
  pop();
  push();
      noStroke();
      fill(0);
      translate(rect_length, 0);
//      ellipse(0,0,ball_size,ball_size);
  pop();
  pop();
  pop();

  // 音の再生
  if(index != index_old)
  {
//    snd[index%3].stop();
    if(index == snd_timing[image_no]) snd[image_no].play();
    
    if(index == snd_timing2[image_no]) snd[image_no].play();
    
    if(touch_onoff)
    {
      count++;    
    }
  }
  
  index_old = index;
  
  push();
  translate(cX, cY);
  noFill();
  strokeWeight(ww/200);
  if(touch_onoff)
  {
    stroke(200,200,200,90);
  }
  else
  {
    stroke(200,200,200,180);
  }
  ellipse(0,0,circle_in,circle_in);
  ellipse(0,0,circle_out2,circle_out2);
  pop();
  
  push();
    translate(cX, cY);
    push();
      rotate(a);
      noStroke();
      fill(200,200,200);
      translate(circle_out/2, 0);
      ellipse(0,0,ball_size*1.5,ball_size*1.5);
    pop();
  pop();

/* 
  //文字の設定
  fill(200);
  textAlign(CENTER);
  textSize(ww*0.07);
  //カウント表示
  text(image_no+1, cX, cY*1.015);
*/

  push();
  rotate(90);
  fill(200);
  textAlign(LEFT);
  textSize(ww*0.02);
  //カウント表示
  text("  Taku Furukawa 2003", 0, -1);
  pop();
}

function mousePressed() 
{
//  snd[0].play();
  uX = mouseX;
  uY = mouseY;
  touch_onoff = true;
}

function mouseReleased() 
{
  touch_onoff = false;
  count = 0;
  image_no++;
  if(image_no > image_no_max) image_no = 0;
  userStartAudio();
  snd[image_no].setVolume(0.5);
  snd[image_no].playMode('restart');
}

function touchStarted() 
{
  touch_onoff = true;
}

function touchEnded() 
{
  touch_onoff = false;
  count = 0;
  image_no++;
  if(image_no > image_no_max) image_no = 0;
  userStartAudio();
  snd[image_no].setVolume(0.5);
  snd[image_no].playMode('restart');
}
/*
function touchMoved() 
{
  uX = touches[0].x;
  uY = touches[0].y;
}
*/
