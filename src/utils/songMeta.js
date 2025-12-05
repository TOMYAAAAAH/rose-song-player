import {tracks} from "../data/tracks.js";
import {albums} from "../data/albums.js";

export function getMeta(songTitle) {

    if (!songTitle) {
        return {
            album: '',
            imgUrl: '/covers/undefined.svg',
        }
    }

    const currentTrack = tracks.find((track) => track.title === songTitle) || {title: "", album: ""};
    const currentAlbum = albums.find((album) => album.name === currentTrack.album) || null;
    const imgUrl = `/covers/${currentAlbum.img}.webp`;

    return {
        album: currentAlbum.name,
        imgUrl: imgUrl,
    }
}

export function getDate(albumName){
    if (!albumName) return null;
    return albums.find((album) => album.name === albumName).date;
}

export function getAudioUrl(songTitle) {
    const currentTrack = tracks.find((track) => track.title === songTitle);
    const audioUrl = `../assets/audios/${currentTrack.audio}`;
    return audioUrl
}

export function getSortedTracks(sortBy) {

    return [...tracks].sort((a, b) => {
        const relatedAlbumA = albums.find((album) => album.name === a.album);
        const relatedAlbumB = albums.find((album) => album.name === b.album);

        let compareValue;
        if (sortBy.includes("popularity")) {
            //pick sort category
            compareValue = a.popularity - b.popularity;
        } else if (sortBy.includes("date")) {
            compareValue = relatedAlbumA.sortDate - relatedAlbumB.sortDate;
        }

        return sortBy.includes("asc") ? compareValue : -compareValue; //pick sort order
    });
}