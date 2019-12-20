// Class to interface with apple music / spotify
// For this first release, we need to have several methods
export class Music{
    constructor(){
        this.allTracks = [new Track()] 
    }
    getAllTracks(){
        // Code to fetch all tracks in library
    }
    getAllArtists(){
        
    }

}

class Track{
    constructor(){
        this.title = '',
        this.artist = '', 
        this.album = '',
    }
}