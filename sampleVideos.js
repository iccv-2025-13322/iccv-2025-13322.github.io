async function sample_short_videos() {
    console.log('Sample button clicked'); // 调试信息

    const videoGrid = document.getElementById('uncurated_short_video_grid');
    videoGrid.innerHTML = '';

    const folders = [
        { video: 'assets/videos/uncurated/sample/rt1', overlay: 'RT-1' },
        { video: 'assets/videos/uncurated/sample/bridge', overlay: 'Bridge' },
        { video: 'assets/videos/uncurated/sample/languagetable', overlay: 'Language-Table' }
    ];
    const totalVideos = 100;

    // 获取8个唯一随机索引
    const indices = new Set();
    while (indices.size < 6) {
        indices.add(Math.floor(Math.random() * totalVideos));
    }

    console.log('Selected indices:', indices); // 调试信息

    // 清空视频网格
    videoGrid.innerHTML = '';

    function createVideoElement(videoPath, overlayText) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video_wrapper';
        videoWrapper.innerHTML = `
            <div class="video_container">
                <video autoplay muted playsinline loop>
                    <source src="${videoPath}" type="video/mp4">
                </video>
                <div class="overlay1 left">Short Trajectory<br>${overlayText}<br>Prediction</div>
                <div class="overlay1 right">Short Trajectory<br>${overlayText}<br>Ground-truth</div>
            </div>
        `;
        return videoWrapper;
    }

    folders.forEach(folder => {
        indices.forEach(index => {
            const videoPath = `${folder.video}/${index}.mp4`;

            console.log('Loading videos:', videoPath); 

            const videoWrapper = createVideoElement(videoPath, `${folder.overlay}`);

            videoGrid.appendChild(videoWrapper);
        });
    });
}

async function sample_long_videos() {
    console.log('Sample button clicked'); // 调试信息

    const videoGrid = document.getElementById('uncurated_long_video_grid');
    videoGrid.innerHTML = '';

    const folders = [
        { video: 'assets/videos/uncurated/episode/rt1', overlay: 'RT-1' },
        { video: 'assets/videos/uncurated/episode/bridge', overlay: 'Bridge' },
        { video: 'assets/videos/uncurated/episode/languagetable', overlay: 'Language-Table' }
    ];
    const totalVideos = 100;

    // 获取8个唯一随机索引
    const indices = new Set();
    while (indices.size < 6) {
        indices.add(Math.floor(Math.random() * totalVideos));
    }

    console.log('Selected indices:', indices); // 调试信息

    // 清空视频网格
    videoGrid.innerHTML = '';

    function createVideoElement(videoPath, overlayText) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video_wrapper';
        videoWrapper.innerHTML = `
            <div class="video_container">
                <video autoplay muted playsinline loop>
                    <source src="${videoPath}" type="video/mp4">
                </video>
                <div class="overlay1 left">Long Trajectory<br>${overlayText}<br>Prediction</div>
                <div class="overlay1 right">Long Trajectory<br>${overlayText}<br>Ground-truth</div>
            </div>
        `;
        return videoWrapper;
    }

    folders.forEach(folder => {
        indices.forEach(index => {
            const videoPath = `${folder.video}/${index}.mp4`;

            console.log('Loading videos:', videoPath); 

            const videoWrapper = createVideoElement(videoPath, `${folder.overlay}`);

            videoGrid.appendChild(videoWrapper);
        });
    });
}

async function sample_longest_videos() {
    console.log('Sample button clicked'); // 调试信息

    const videoGrid = document.getElementById('uncurated_long_video_grid');
    videoGrid.innerHTML = '';

    const folders = [
        {
            video: 'assets/videos/uncurated/episode/rt1',
            overlay: 'RT-1',
            frames: [
                { idx: 75, frame_count: 153 },
                { idx: 68, frame_count: 129 },
                { idx: 73, frame_count: 126 },
                { idx: 20, frame_count: 114 },
                { idx: 61, frame_count: 108 },
                { idx: 89, frame_count: 88 }
            ]
        },
        {
            video: 'assets/videos/uncurated/episode/bridge',
            overlay: 'Bridge',
            frames: [
                { idx: 79, frame_count: 79 },
                { idx: 94, frame_count: 77 },
                { idx: 15, frame_count: 74 },
                { idx: 48, frame_count: 65 },
                { idx: 44, frame_count: 61 },
                { idx: 39, frame_count: 49 }
            ]
        },
        {
            video: 'assets/videos/uncurated/episode/languagetable',
            overlay: 'Language-Table',
            frames: [
                { idx: 38, frame_count: 48 },
                { idx: 4, frame_count: 47 },
                { idx: 83, frame_count: 47 },
                { idx: 61, frame_count: 42 },
                { idx: 89, frame_count: 42 },
                { idx: 93, frame_count: 42 }
            ]
        }
    ];
    

    function createVideoElement(videoPath, overlayText, frame) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video_wrapper';
        videoWrapper.innerHTML = `
            <div class="video_container">
                <video autoplay muted playsinline loop>
                    <source src="${videoPath}" type="video/mp4">
                </video>
                <div class="overlay1 left">Long Trajectory<br>${overlayText}<br> Prediction <br> ${frame}</div>
                <div class="overlay1 right">Long Trajectory<br>${overlayText}<br> Ground-truth <br> ${frame}</div>
            </div>
        `;
        return videoWrapper;
    }

    folders.forEach(folder => {
        folder.frames.forEach(frame => {
            console.log(frame); 
            const predVideo = `${folder.video}/${frame.idx}.mp4`
            console.log(`Attempting to load prediction video from: ${predVideo}`); 

            const videoWrapper = createVideoElement(predVideo, `${folder.overlay}`, `${frame.frame_count} frames`);

            videoGrid.appendChild(videoWrapper);
        });
    });

    // 最后再检查一次是否所有元素都被正确添加
    console.log('Final video grid content:', videoGrid.innerHTML);
}

