--setup camera
camera = {x = 0, y = 0, w = 640, h = 480, moveSpeed = 150}

love.graphics.setMode( camera.w, camera.h)

--setup map
map = {x = 0, y = 0, w = 1280, h = 1024}

--setup example box
box = {x = 32, y = 32, drawX = 32, drawY = 32, w = 32, h = 32}

function love.update(dt)
	--update box, including wrapping
	UpdateBox()
	
	--update camera
	UpdateCamera(dt)
end

function love.draw()
	--draw box
	DrawBox()
	
	love.graphics.print("Box X: "..box.x, 4, 4)
	love.graphics.print("Box Y: "..box.y, 4, 16)
	love.graphics.print("Box Draw X: "..box.drawX, 4, 28)
	love.graphics.print("Box Draw Y: "..box.drawY, 4, 40)
	love.graphics.print("Camera X: "..camera.x, 4, 52)
	love.graphics.print("Camera Y: "..camera.y, 4, 64)
end

function UpdateBox()
	--set the box's draw coordinates, relative to the camear
	box.drawX = box.x - camera.x
	box.drawY = box.y - camera.y
	
	--map wrapping
	if ((box.drawX + box.w) > map.w) then box.drawX = box.drawX - map.w
	elseif ((box.drawX + box.w) < map.x) then box.drawX = box.drawX + map.w end
	if ((box.drawY + box.h) > map.h) then box.drawY = box.drawY - map.h
	elseif ((box.drawY + box.h) < map.y) then box.drawY = box.drawY + map.h end
end

function DrawBox()
	love.graphics.rectangle("fill",box.drawX,box.drawY,box.w,box.h)
end

function UpdateCamera(dt)
	if love.keyboard.isDown('right') then camera.x = camera.x + camera.moveSpeed * dt
	elseif love.keyboard.isDown('left') then camera.x = camera.x - camera.moveSpeed * dt end
	if love.keyboard.isDown('down') then camera.y = camera.y + camera.moveSpeed * dt
	elseif love.keyboard.isDown('up') then camera.y = camera.y - camera.moveSpeed * dt end
	
	--correct camera coordinates, if needed
	if (camera.x > map.w) then camera.x = camera.x - map.w
	elseif ((camera.x + camera.w) < map.x) then camera.x = camera.x + map.w end
	if (camera.y > map.h) then camera.y = camera.y - map.h
	elseif ((camera.y + camera.h) < map.y) then camera.y = camera.y + map.h end
end 