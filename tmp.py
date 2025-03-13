import os
import re
import imageio
import numpy as np

def add_border(image, thickness, color):
    """
    为 image 添加边框
    image: numpy 数组，形状 (h, w, 3)
    thickness: 边框宽度（像素）
    color: 边框颜色，格式 (R, G, B)
    """
    h, w, _ = image.shape
    new_h = h + 2 * thickness
    new_w = w + 2 * thickness
    # 创建一个填充指定颜色的新图像
    new_image = np.full((new_h, new_w, 3), color, dtype=image.dtype)
    # 将原图像复制到中间区域
    new_image[thickness:thickness+h, thickness:thickness+w, :] = image
    return new_image

def process_video(input_path, output_path, border_thickness=10):
    """
    对单个视频逐帧处理：
    - 每帧按高度一分为二（上半部分、下半部分）
    - 上半部分添加蓝色边框，下半部分添加橙色边框
    - 交换顺序后拼接为一帧，写入输出视频
    """
    reader = imageio.get_reader(input_path, 'ffmpeg')
    meta = reader.get_meta_data()
    fps = meta['fps']
    writer = imageio.get_writer(output_path, fps=fps)
    
    # 定义颜色（BGR颜色表示为 (R, G, B)）
    blue = (0, 0, 255)
    orange = (241, 151, 55)
    
    for frame in reader:
        # frame.shape: (height, width, 3)
        h, w, _ = frame.shape
        top_height = h // 2
        bottom_height = h - top_height
        
        # 裁剪上半部分和下半部分
        top_frame = frame[:top_height, :, :]
        bottom_frame = frame[top_height:, :, :]
        
        # 分别添加边框：上半部分蓝色，下半部分橙色
        top_with_border = add_border(top_frame, border_thickness, blue)
        bottom_with_border = add_border(bottom_frame, border_thickness, orange)
        
        # 交换顺序：橙色部分（下半部分）放上面，蓝色部分放下面
        final_frame = np.concatenate([bottom_with_border, top_with_border], axis=0)
        writer.append_data(final_frame)
    
    writer.close()
    reader.close()

def process_all_videos(root_dir="assets/videos", output_root="assets/videos_modified", border_thickness=10):
    """
    遍历指定目录下所有 .mp4 视频，按原目录结构处理并保存到新目录
    """
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            if file.lower().endswith(".mp4"):
                input_path = os.path.join(dirpath, file)
                relative_path = os.path.relpath(input_path, root_dir)
                output_path = os.path.join(output_root, relative_path)
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                print(f"正在处理: {input_path} -> {output_path}")
                process_video(input_path, output_path, border_thickness)

def update_html(html_path, old_dir="assets/videos", new_dir="assets/videos_modified"):
    """
    更新 HTML 文件中 video 标签的 src 路径，
    将原路径中的 old_dir 替换为 new_dir
    """
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    updated_html = html_content.replace(old_dir, new_dir)
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(updated_html)
    
    print(f"HTML 文件 {html_path} 已更新。")

if __name__ == "__main__":
    # 处理所有视频
    process_all_videos(root_dir="assets/videos/planning", output_root="assets/videos/planning_modified", border_thickness=10)
    
    # 修改 HTML 文件中的视频路径，请将 your_html_file.html 替换为实际文件路径
    # html_file_path = "your_html_file.html"
    # update_html(html_file_path, old_dir="assets/videos", new_dir="assets/videos_modified")
