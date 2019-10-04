// TODO: create the User class/object
// it must support rank, progress and the incProgress(rank) method

class User {
    constructor(userName, rank, progress) {
        if (!!userName) this.userName = userName;
        else this.userName = "";
        if (!!rank) this.rank = rank;
        else this.rank = -8;
        if (!!progress) this.progress = progress;
        else this.progress = 0;
    }

    incProgress(activityrank) {
        if (activityrank < -8 || activityrank > 8 || activityrank === 0)
            throw "Activity Rank not supported, musty be between -8 and 8, excluding zero";

        if (activityrank === 8 && this.rank === 8) return;

        let increment = this.calculatePoints(activityrank, this.rank);
        this.progress += increment;
        if (this.progress >= 100 && this.rank < 8) {
            this.incRank(Math.floor(this.progress / 100));
            if (this.rank < 8) this.progress = this.progress % 100
        }
    }

    incRank(increment) {
        if (this.rank === 8) return;
        this.rank += increment;
        if (this.rank === 0) this.rank++
        if (this.rank >= 8) {
            this.rank = 8;
            this.progress = 0;
        }
    }

    calculatePoints(activityRank, userRank) {
        var progressIncrement = 0;
        var rankDifference = -2;

        if (activityRank > userRank) {
            rankDifference = Math.abs(userRank - activityRank);
            if (activityRank > 0 && userRank < 0) rankDifference -= 1;

            progressIncrement = 10 * Math.pow(rankDifference, 2);
        }
        else if (activityRank < userRank) {
            rankDifference = Math.abs(activityRank - userRank);
            if (userRank > 0 && activityRank < 0) rankDifference -= 1;

            if (rankDifference >= 2) progressIncrement = 0;
            else if (rankDifference == 1) progressIncrement = 1;
        }
        else if (activityRank == userRank) progressIncrement = 3;

        return progressIncrement;
    }
}

var user = new User()
console.log("starting values: rank: " + user.rank + ", progress: " + user.progress);
user.rank // => -8  
user.progress // => 0
user.incProgress(-3)
// console.log("starting values: rank: " + user.rank + ", progress: " + user.progress);
// user.progress // => 10
// user.incProgress(-5) // will add 90 progress
// user.progress
// user.rank
// //   console.log(user.rank)

// class User {
//     constructor() {
//       this.totalProgress = 0;
//     }
    
//     get progress() {
//       return this.rank < 8 ? this.totalProgress % 100 : 0;
//     }
    
//     get rank() {
//       let rank = Math.floor(this.totalProgress / 100) - 8;
//       return rank >= 0 ? rank + 1 : rank;
//     }
    
//     incProgress(rank) {
//       if (rank === 0 || rank < -8 || rank > 8) {
//         throw new Error('Rank out of bounds');
//       }
      
//       if (rank > 0  && this.rank < 0) {
//         rank--;
//       }
  
//       const diff = rank - this.rank;
//       this.totalProgress += diff > 0 ? (10 * diff * diff) : diff < 0 ? 1 : 3;
//     }
//   }