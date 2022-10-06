object = app.activeDocument.selection[0];

for(j=0; j<10; j++) 
{
//make a row
 for(i=0; i<8; i++)
{
newobject = object.duplicate();
newobject.translate(object.width*(i+1), -object.height*(j+1));
newobject.rotate(Math.floor(Math.random()*4)*90);
}
}