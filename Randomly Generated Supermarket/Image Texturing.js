function createTextures(){ 	
let array = [name, "'s"]
    let separator = ""
    let message = join(array, separator);
    let tsize = 50;
  
    canTexture.textAlign(CENTER,CENTER);
    canTexture.textSize(tsize)  
    do{
     tsize-=1; 
     canTexture.textSize(tsize)        
    }while(canTexture.textWidth(message) > 200)
  
  //Regular Can texture

      
    canTexture.push()
    canTexture.image(canBase,0,0,600,600);
    canTexture.imageMode(CENTER);
    canTexture.fill(255);
    canTexture.text(message,300,67);
  
    tsize = 50;
    canTexture.textSize(tsize)    
    canTexture.text("Soup",300,120);
    canTexture.image(img,300,270,200,230)
    canTexture.pop()
  //Short Can Texture

    scanTexture.textAlign(LEFT,CENTER);
    scanTexture.textSize(tsize)
    do{
     tsize-=1; 
     scanTexture.textSize(tsize)        
    }while(scanTexture.textWidth(message) > 100)
      
    scanTexture.push()
    scanTexture.image(sCanBase,0,0,600,300);
    scanTexture.imageMode(CENTER); 
    scanTexture.fill(255);
    scanTexture.text(message,280,35);
  
    tsize = 30;
    scanTexture.textSize(tsize)    
    scanTexture.text("Tuna ",280,80); 
    scanTexture.image(img,230,57,80,90)
    scanTexture.pop();
  
    //Long Can Texture
    tsize = 50;
    lcanTexture.textAlign(LEFT,CENTER);
    lcanTexture.textSize(tsize)
    do{
     tsize-=1; 
     lcanTexture.textSize(tsize)        
    }while(lcanTexture.textWidth(message) > 100)
      
    lcanTexture.push()
    lcanTexture.image(lCanBase,0,0,600,300);
    lcanTexture.imageMode(CENTER); 
    lcanTexture.fill(255);
    lcanTexture.text(message,320,35);
  
    tsize = 20;
    lcanTexture.textSize(tsize)    
    lcanTexture.text("Mackarel",320,80); 
    lcanTexture.image(img,295,55,45,85)
    lcanTexture.pop()
	
	
    tsize = 50;	
	mTexture.textAlign(CENTER,CENTER);
    mTexture.textSize(tsize)  
    do{
     tsize-=1; 
     mTexture.textSize(tsize)        
    }while(mTexture.textWidth(message) > 300)
  
  //Regular Can texture
    mTexture.push()
    mTexture.image(drinkBase,0,0,600,600);
    mTexture.imageMode(CENTER);
    mTexture.fill(255);
    mTexture.text(name,270,55);
  
    tsize = 50;
    mTexture.textSize(tsize)    
    mTexture.text("Hydration",270,100);
    mTexture.image(img,270,240,200,230)
    mTexture.pop()
	
	
 //Short Can Texture

    sTexture.textAlign(CENTER,CENTER);
    sTexture.textSize(tsize)
    do{
     tsize-=1; 
     sTexture.textSize(tsize)        
    }while(sTexture.textWidth(message) > 150)
      
    sTexture.push()
    sTexture.image(sDrinkBase,0,0,600,600);
    sTexture.imageMode(CENTER); 
    sTexture.fill(255);
    sTexture.text(name,260,95);
  
    tsize = 30;
    sTexture.textSize(tsize)    
    sTexture.text("Cola",260,250); 
    sTexture.image(img,260,170,80,90)
    sTexture.pop()
  
  
  //Large Texture

    lTexture.textAlign(CENTER,CENTER);
    lTexture.textSize(tsize)
    do{
     tsize-=1; 
     lTexture.textSize(tsize)        
    }while(lTexture.textWidth(message) > 200)
      
    lTexture.push()
    lTexture.image(lDrinkBase,0,0,600,600);
    lTexture.imageMode(CENTER); 
    lTexture.fill(255);
    lTexture.text(name,260,130);
  
    tsize = 30;
    lTexture.textSize(tsize)    
    lTexture.text("Energy",260,280); 
    lTexture.image(img,260,200,80,90)
    lTexture.pop()
  
  
}