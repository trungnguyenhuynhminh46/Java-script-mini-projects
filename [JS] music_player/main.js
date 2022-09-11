/*
* 1. Render htmls songs -
* 2. Scroll top -
* 3. Play / pause / seek -
* 4. CD rotate -
* 5. Next / prev - 
* 6. Random / Repeat - 
* 7. Next / Repeat when ended -
* 8. Active song -
* 9. Scroll active song into view -
* 10. Play song when click -
* 11. Lưu trạng thái: bài đang phát, thời lượng, isRepeat, isRandom -
* 12. Tăng giảm âm lượng -
*/ 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const MUSIC_PLAYER_KEY = "MUSIC PLAYER";
//Container Elements
var player = $('.player');
var header = $('header');
var cd = $('.cd');
var control = $('.control');
var playlist = $('.playlist');
var volume_container = $('.volume__container');
// Button Elements
var btn_repeat = control.querySelector('.btn-repeat');
var btn_prev = control.querySelector('.btn-prev');
var btn_toggle_play = control.querySelector('.btn-toggle-play');
var btn_next = control.querySelector('.btn-next');
var btn_random = control.querySelector('.btn-random');
// Others Elements
var progress = $('#progress');
var audio = $('#audio');
var volume = volume_container.querySelector('#volume');
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};
const app = {
config: localStorage.getItem(MUSIC_PLAYER_KEY)?JSON.parse(localStorage.getItem(MUSIC_PLAYER_KEY)):{},
isPlay: false,
currentSongIndex: 0,
isRandom: false,
isRepeat: false,
isMuted: false,
currentTime: 0,
currentVolume: 1,
// Tạo hoán vị hạn chế lặp lại bài hát
permutation: [],
permutation_index: 0,
songs: [
    {
    name: "Nevada",
    singer: "Vicetone",
    image: "./assets/images/image1.jpg",
    path: "./assets/musics/music1.mp3"
    },
    {
    name: "SummerTime",
    singer: "K-391",
    image: "./assets/images/image2.jpg",
    path: "./assets/musics/music2.mp3"
    },
    {
    name: "Monody",
    singer: "TheFatRat",
    image: "./assets/images/image3.jpg",
    path: "./assets/musics/music3.mp3"
    },
    {
    name: "Reality",
    singer: "Lost Frequencies feat. Janieck Devy",
    image: "./assets/images/image4.jpg",
    path: "./assets/musics/music4.mp3"
    },
    {
    name: "Ngày khác lạ",
    singer: "Đen",
    image: "./assets/images/image5.jpg",
    path: "./assets/musics/music5.mp3"
    },
    {
    name: "Lemon Tree",
    singer: "DJ DESA REMIX",
    image: "./assets/images/image6.jpg",
    path: "./assets/musics/music6.mp3"
    },
    {
    name: "Sugar",
    singer: "Maroon 5",
    image: "./assets/images/image7.jpg",
    path: "./assets/musics/music7.mp3"
    },
    {
    name: "My Love",
    singer: "Westlife",
    image: "./assets/images/image8.jpg",
    path: "./assets/musics/music8.mp3"
    },
    {
    name: "Attention",
    singer: "Charlie Puth",
    image: "./assets/images/image9.jpg",
    path: "./assets/musics/music9.mp3"
    },
    {
    name: "Monsters",
    singer: "Katie Sky",
    image: "./assets/images/image10.jpg",
    path: "./assets/musics/music10.mp3"
    },
],
setConfigItem: function(key, value){
    this.config[key] = value;
    localStorage.setItem(MUSIC_PLAYER_KEY, JSON.stringify(this.config));
},
loadConfig: function(){
    // currentSongIndex: 0,
    if(this.config['currentSongIndex']>0){
        this.currentSongIndex = this.config['currentSongIndex'];
    }
    // isRandom: false,
    if(this.config['isRandom']){
        this.isRandom = this.config['isRandom'];
    }
    // isRepeat: false,
    if(this.config['isRepeat']){
        this.isRepeat = this.config['isRepeat'];
    }
    // isMuted: false,
    if(this.config['isMuted']){
        this.isMuted = this.config['isMuted'];
        audio.muted = this.isMuted;
    }
    // currentVolume: 1,
    if(this.config['currentVolume']>=0){
        this.currentVolume = this.config['currentVolume'];
        audio.volume = this.currentVolume;
    }
    // currentTime: 0
    if(this.config['currentTime']>=0){
        this.currentTime = this.config['currentTime'];
        audio.currentTime = this.currentTime;
    }

},
start: function(){
    this.loadConfig();
    this.renderHTML();
    this.loadCurrentSong();
    this.eventHandle();
    this.makePermutation(this.songs.length);
    this.updateVolumeDisplay();
},
renderHTML: function(){
    let songHTMLs = [];
    this.songs.forEach(
    (song, index) => {
        let songHTML = `
        <div class="song ${(this.currentSongIndex==index)?'active':''}" data-song-id="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `;
        songHTMLs.push(songHTML);
    }
    );
    playlist.innerHTML = songHTMLs.join('');
    if(this.isRandom){
        btn_random.classList.add('active');
    }
    // isRepeat: false,
    if(this.isRepeat){
        btn_repeat.classList.add('active');
    }
}, 
eventHandle: function(){
    let _this = this;
    //Event scroll top
    let cdOriginWidth = cd.offsetWidth;
    window.addEventListener('scroll', function(e){
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    newWidth = (cdOriginWidth - scrollY)>0?(cdOriginWidth - scrollY):0;
    cd.style.width = newWidth+'px';
    cd.style.opacity = newWidth / cdOriginWidth;
    });
    let thumb_rotate = cd.querySelector('.cd-thumb').animate([
        { transform: 'rotate(360deg)' }
    ],{
        duration: 5000,
        iterations: Infinity,
    });
    thumb_rotate.pause();

    // Event click buttons (Play/pause/seek)
    btn_toggle_play.addEventListener('click', function(e){
        _this.isPlay = !_this.isPlay;
        if(_this.isPlay){
            audio.play();
        }else{
            audio.pause();
        }
    });
    btn_next.addEventListener('click', function(e){
        _this.loadNextSong();
        audio.play();
    });
    btn_prev.addEventListener('click', function(e){
        _this.loadPreviousSong();
        audio.play();
    });
    btn_random.addEventListener('click', function(e){
        _this.isRandom = !_this.isRandom;
        if(_this.isRandom){
            // Update html
            btn_random.classList.add('active');
            // Save into localStorage

        }else{
            // Update html
            btn_random.classList.remove('active');
            // Save into localStorage
        }
        _this.setConfigItem('isRandom', _this.isRandom);
    });
    btn_repeat.addEventListener('click', function(e){
        _this.isRepeat = !_this.isRepeat;
        if(_this.isRepeat){
            // Update html
            btn_repeat.classList.add('active');
            // Save into localStorage
        }else{
            // Update html
            btn_repeat.classList.remove('active');
            // Save into localStorage
        }
        _this.setConfigItem('isRepeat', _this.isRepeat);
    });
    // Audio
    audio.addEventListener('play', function(e){
        player.classList.add('playing');
        _this.isPlay = true;
        thumb_rotate.play();
    })
    audio.addEventListener('pause', function(e){
        player.classList.remove('playing');
        _this.isPlay = false;
        thumb_rotate.pause();
    })
    audio.addEventListener('timeupdate', function(e){
        let percentage = (audio.currentTime/audio.duration)?(audio.currentTime/audio.duration)*100:0;
        progress.value = Math.floor(percentage);
        _this.currentTime = audio.currentTime;
        _this.setConfigItem('currentTime', _this.currentTime);
    })
    audio.addEventListener('ended', function(e){
        if(_this.isRepeat){
            audio.play();
        }else{
            _this.loadNextSong();
            audio.play();
        }
    })
    audio.addEventListener('volumechange', function(e){
        _this.updateVolumeDisplay();
        _this.setConfigItem('currentVolume', _this.currentVolume);
    })
    // Others
    progress.addEventListener('input', function(e){
        let percentage = progress.value;
        audio.currentTime = audio.duration * (percentage/100);
        audio.play();
    })

    playlist.addEventListener('click', function(e){
        let element = e.target.closest('.song:not(.active)');
        _this.loadSongBySongID(element.dataset.songId);
        audio.play();
    })

    // Volume
    let list_volume_class = {
        muted: ["fas", "fa-volume-mute"],
        off: ["fas", "fa-volume-off"],
        low: ["fas", "fa-volume-down"],
        high: ["fas", "fa-volume-up"]
    };
    let volume_icon = volume_container.querySelector('i');
    volume_icon.addEventListener('click', function(e){
        audio.muted = !audio.muted;
        _this.isMuted = audio.muted;
        _this.updateVolumeDisplay();
        _this.setConfigItem('isMuted', _this.isMuted);
    });
    volume.addEventListener('input', function(e){
        _this.currentVolume = volume.value / 100;
        audio.volume = _this.currentVolume;
    })

},
loadCurrentSong: function(){
    this.setConfigItem('currentSongIndex', this.currentSongIndex);
    let currentSong = this.songs[this.currentSongIndex];
    audio.src = currentSong.path;
    // Update HTML
    header.querySelector('h2').innerText = currentSong.name;
    cd.querySelector('.cd-thumb').style.backgroundImage = `url(${currentSong.image})`;
    let currentActiveElement = $('.song.active');
    let wantToActiveElement = $('.song');
    Array.from($$('.song')).forEach(
        (element, index) => {
            if(index == this.currentSongIndex){
                wantToActiveElement = element;
            }
        }
    );
    currentActiveElement.classList.remove('active');
    wantToActiveElement.classList.add('active');
    wantToActiveElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}, 
loadNextSong: function(){
    // Update currentSongIndex
    if(this.isRandom){
        if(this.permutation_index === (this.songs.length - 1)){
            this.makePermutation(this.songs.length);
            this.permutation_index = 0;
        }
        this.currentSongIndex = this.permutation[this.permutation_index++];
    }else{
        if(this.currentSongIndex >= (this.songs.length - 1)){
            this.currentSongIndex = 0;
        }else{
            this.currentSongIndex += 1;
        }
    }
    this.loadCurrentSong();
},
loadPreviousSong: function(){
    // Update currentSongIndex
    if(this.isRandom){
        // Nếu load đến cuối hoán vị thì tạo lại
        if(this.permutation_index === (this.songs.length - 1)){
            this.makePermutation(this.songs.length);
            this.permutation_index = 0;
        }
        this.currentSongIndex = this.permutation[this.permutation_index++];
    }else{
        if(this.currentSongIndex <= 0){
            this.currentSongIndex = this.songs.length - 1;
        }else{
            this.currentSongIndex -= 1;
        }
    }
    this.loadCurrentSong();
},
loadSongBySongID: function(songId){
    this.currentSongIndex = songId;
    this.loadCurrentSong();
},
makePermutation: function(length){
    let arr = [];
    for(let i = 0; i<length; ++i){
        arr.push(i);
    }
    this.permutation = shuffle(arr);
    arr = this.permutation;
    return arr;
},
updateVolumeDisplay: function(){
    let list_volume_icon_class = {
        muted: ["fas", "fa-volume-mute"],
        off: ["fas", "fa-volume-off"],
        low: ["fas", "fa-volume-down"],
        high: ["fas", "fa-volume-up"]
    };
    let volume_icon = volume_container.querySelector('i');
    if(audio.muted){
        volume_icon.classList.remove(...volume_icon.classList);
        volume_icon.classList.add(...list_volume_icon_class.muted);
        volume.value = 0;
    }else{
        volume.value = this.currentVolume * 100;
        if(this.currentVolume == 0){
            volume_icon.classList.remove(...volume_icon.classList);
            volume_icon.classList.add(...list_volume_icon_class.off);
        }else if(this.currentVolume < 0.5){
            volume_icon.classList.remove(...volume_icon.classList);
            volume_icon.classList.add(...list_volume_icon_class.low);
        }else{
            volume_icon.classList.remove(...volume_icon.classList);
            volume_icon.classList.add(...list_volume_icon_class.high);
        }
    }
}
};