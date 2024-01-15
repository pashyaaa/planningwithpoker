import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { onSnapshot } from '@angular/fire/firestore';
import { CreateGameComponent } from './create-game/create-game.component';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.page.html',
  styleUrls: ['./poker.page.scss'],
})
export class PokerPage implements OnInit, OnDestroy {

  gameId:any;
  game:any;
  playerId:any;
  player:any;
  players = [];
  curRound:any = {};
  votes = [];
  curVote = -99;
  numberSeries = [[1,2,3,4,5],[0,1,2,3,5,8,13]];
  selectedNumberSeries;
  playerProfilePic = "https://ionicframework.com/docs/img/demos/avatar.svg";
  description: String = "";

  constructor(
    private route: ActivatedRoute,
    private dataService:DataService,
    private popoverController: PopoverController,
    private router: Router,
    private platformLocation: PlatformLocation
  )
  {
    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(()=>{
      history.pushState(null, '', location.href);
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy")
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id')!;
    console.log(this.gameId)
    if(this.gameId == null)
    {
      this.createGame();
    }
    else
    {
      const getGame = onSnapshot(
        this.dataService.getGame(this.gameId),
        async (snapshot) => {
          this.game = snapshot.data();
          this.selectedNumberSeries = this.game.numberSeries;
          console.log(this.game)
          console.log(this.game.currentRound)
          if(this.game.currentRound == undefined || this.game.currentRound == '')
          {
            await this.dataService.addRound(this.gameId).then(
              async res => {
                this.curRound.id = res.id;
                console.log(res.id)
                await this.dataService.editGame(this.gameId, this.curRound.id)
                this.getRound()
              }
            )
          }
          else
          {
            this.curRound.id = this.game.currentRound;
            this.getRound()
          }

          console.log(this.curRound.id)
        },
        (error) => {
          // ...
        });

      this.playerId = localStorage.getItem(this.gameId);
      if(this.playerId == null)
      {
        this.createPlayer(this.gameId);
      }else
      {
        this.player = (await this.dataService.getPlayer(this.gameId, this.playerId)).data();
        if(this.player.profilePic)
        {
          this.playerProfilePic = this.player.profilePic;
        }
        else{
          this.playerProfilePic = "https://ionicframework.com/docs/img/demos/avatar.svg";
        }
        console.log(this.player)
        if(this.player == undefined){
          this.createPlayer(this.gameId);
        }
      }

      const getPlayers = onSnapshot(
        this.dataService.getPlayers(this.gameId),
        (snapshot) => {
          this.players = [];
          snapshot.forEach((doc) => {
            const player = doc.data();
            player.id = doc.id;
            console.log(player)
            if(player.profilePic == undefined)
            {
              player.profilePic = "https://ionicframework.com/docs/img/demos/avatar.svg"
            }
            this.players.push(player);
          });
        },
        (error) => {
          // ...
        });
    }
  }

  getRound()
  {
    //Get Round and votes
    const getRound = onSnapshot(
      this.dataService.getRound(this.gameId, this.curRound.id),
      async (snapshot) => {
        this.curRound = snapshot.data();
        this.curRound.id = snapshot.id;
        this.description = this.curRound.description;
        console.log(this.curRound)
        console.log(this.description)

        const getVotes = onSnapshot(
          this.dataService.getVotes(this.gameId, this.curRound.id),
          (snapshot) => {
            this.votes = [];
            snapshot.forEach((doc) => {
              const vote = doc.data();
              vote.id = doc.id;
              console.log(vote)
              this.votes.push(vote);
            });
            this.selectedVote(this.playerId);
          },
          (error) => {
            // ...
          });
    });
  }

  async createPlayer(gameId){
    const popover = await this.popoverController.create({
      component: CreatePlayerComponent,
      backdropDismiss: false,
      componentProps: {
        popoverController: this.popoverController,
        gameId: gameId,
        action: 0
      },
      translucent: true,
    });
    popover.onDidDismiss().then(
      async res=>{
        this.playerId = res.data.playerId;
        console.log(this.playerId)
        this.player = (await this.dataService.getPlayer(this.gameId, this.playerId)).data();
        this.playerProfilePic = this.player.profilePic;
        console.log(this.player)
        this.selectedVote(this.playerId);
      }
    )
    return await popover.present();
  }

  async editPlayer(playerId){
    const popover = await this.popoverController.create({
      component: CreatePlayerComponent,
      componentProps: {
        popoverController: this.popoverController,
        gameId: this.gameId,
        playerId: playerId,
        playerName: this.player.name,
        playerProfilePic: this.player.profilePic,
        action: 1
      },
      translucent: true,
    });
    popover.onDidDismiss().then(
      async res=>{
        this.playerId = res.data.playerId;
        console.log(this.playerId)
        this.player = (await this.dataService.getPlayer(this.gameId, this.playerId)).data();
        this.playerProfilePic = this.player.profilePic;
        console.log(this.player)
      }
    )
    return await popover.present();
  }

  async createGame(){
    const popover = await this.popoverController.create({
      component: CreateGameComponent,
      size: 'cover',
      backdropDismiss: false,
      componentProps: {
        popoverController: this.popoverController,
        action: 0
      },
      translucent: true,
    });
    popover.onDidDismiss().then(
      async res=>{
        this.gameId = res.data.gameId;
        this.selectedNumberSeries = res.data.selectedNumberSeries;
        this.router.navigate(['poker/'+this.gameId])
      }
    )
    return await popover.present();
  }

  async editGame(){
    console.log(this.game.name)
    const popover = await this.popoverController.create({
      component: CreateGameComponent,
      componentProps: {
        popoverController: this.popoverController,
        gameId: this.gameId,
        gameName: this.game.name,
        action: 1
      },
      translucent: true,
    });
    return await popover.present();
  }

  reveal(){
    this.dataService.editRound(this.gameId, this.curRound.id, true).then(
      res => {
        console.log(res)
      }
    )
  }

  reset(){
    this.description = ""
    this.curVote = -99;
    this.dataService.addRound(this.gameId).then(
      async res => {
        this.curRound.id = res.id;
        console.log(res.id)
        await this.dataService.editGame(this.gameId, this.curRound.id)
      }
    )
  }

  vote(vote:number){
    console.log(vote)
    console.log(this.curRound.id)
    console.log(this.playerId)
    if(this.curRound && !this.curRound.isReveled){
      this.curVote = vote;
      this.dataService.addVote(this.gameId, this.curRound.id, this.playerId, vote);
      this.playAudio();
    }
  }

  saveDescription()
  {
    if(this.description == undefined)
    {
      this.description = "";
    }
    console.log(this.description)
    this.dataService.addDescription(this.gameId, this.curRound.id, this.description).then(
      res => {
        console.log(res)
      }
    )
  }

  playerColor(player:any){
    if(player){
      if(this.isVoted(player.id)){
        return '#0099ff9d'
      }else{
        return '#D3D3D3'
      }
    }else{
      return 'light'
    }
  }

  isVoted(id:any){
    let voted = false;
    this.votes.forEach(vote => {
      if(vote.id == id){
        voted = true
      }
    })
    return voted;
  }

  selectedVote(id:any){
    console.log(id)
    let sVote;
    this.votes.forEach(vote => {
      if(vote.id == id){
        sVote = vote.vote
      }
    })
    this.curVote = sVote;
    console.log(this.curVote)
  }

  getVote(id:any){
    let sVote;
    this.votes.forEach(vote => {
      if(vote.id == id){
        sVote = vote.vote
      }
    })
    return sVote;
  }

  getAverage() {
    let sum = 0;
    for (let i = 0; i < this.votes.length; ++i) {
        sum += this.votes[i].vote;
    }
    let avg = sum / this.votes.length;
    return Math.round(avg * 10) / 10;
  }

  votesFor(vote:number){
    let filteredVotes = this.votes.filter(res=>{return res.vote==vote});
    console.log(filteredVotes)
    return filteredVotes;
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/audio/tap.mp3";
    audio.load();
    audio.play();
  }
}
