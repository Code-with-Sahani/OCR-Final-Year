# Below Method extract the charactor according to the letters. 
config = 'digits' 
results = pytesseract.image_to_boxes(img_RGB) 
ih, iw, ic = image.shape 
for box in results.splitlines(): 
box = box.split(' ') 
print(box) 
x, y, w, h = int(box[1]), int(box[2]), int(box[3]), int(box[4]) 
cv2.rectangle(image, (x, ih-y), (w, ih-h), (0, 255, 0), 2) 
cv2.putText(image, box[0], (x, ih-h), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 1) 