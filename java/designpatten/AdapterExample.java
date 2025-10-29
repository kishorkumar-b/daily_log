interface MediaPlayer { void play(String fileName); }

class MP3Player implements MediaPlayer {
    public void play(String fileName) {
        System.out.println("Playing MP3 file: " + fileName);
    }
}
class MediaAdapter implements MediaPlayer {
    AdvancedPlayer advancedPlayer;

    public MediaAdapter(AdvancedPlayer advancedPlayer) {
        this.advancedPlayer = advancedPlayer;
    }

    public void play(String fileName) {
        advancedPlayer.playFile(fileName);
    }
}

class AdvancedPlayer {
    public void playFile(String fileName) {
        System.out.println("Playing advanced format: " + fileName);
    }
}

public class AdapterExample {
    public static void main(String[] args) {
        MediaPlayer player = new MediaAdapter(new AdvancedPlayer());
        player.play("song.mp4");
    }
}
