from PIL import Image

def concat_images_vertically(image_path1, image_path2, output_path):
    # 打开两张图片
    img1 = Image.open(image_path1)
    img2 = Image.open(image_path2)
    
    # 计算拼接后图像的尺寸
    new_width = max(img1.width, img2.width)
    new_height = img1.height + img2.height
    
    # 创建新的空白图片
    new_img = Image.new('RGB', (new_width, new_height))
    
    # 粘贴第一张图片
    new_img.paste(img1, (0, 0))
    # 粘贴第二张图片
    new_img.paste(img2, (0, img1.height))
    
    # 保存拼接后的图片
    new_img.save(output_path)
    print(f"拼接完成，保存为 {output_path}")

# 示例调用
concat_images_vertically("assets/videos/planning/place_red/start_image.png", "assets/videos/planning/place_red/target_image.png", "assets/videos/planning/place_red/concat.png")
