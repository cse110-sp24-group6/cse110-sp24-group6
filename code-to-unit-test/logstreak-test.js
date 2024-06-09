
  /* Daily Log Streak implementation */ 
  const checkedImgSrc = "../source/assets/HTML_homepage_pics/checked_in.png";
  const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png";
  
  function getLogsFromStorage() { 
    let logs = localStorage.getItem('logs');
    let returnLog;
    if (logs) {
        returnLog = JSON.parse(logs);
        return returnLog;
    }
    else {
        returnLog = {};
        return returnLog;
    }
  }
  
  
  // Get the log for given date 
  function getLog(date) { 
    let logs = getLogsFromStorage(); 
    return logs[dateToString(date)];
  
  }
  
  // Loop through logs to count consecutive logs from today's date 
  function findStreak() { 
    let streak = 0; 
    let logs = getLogsFromStorage(); 
    let day = new Date();
    // Check if there is a log today, and add to streak 
    if (getLog(day)) { 
      streak += 1; 
    }
    // Set day to yesterday 
    day = new Date(Date.now()-(24*60*60*1000)); 
    // Find out if there was a previous streak 
    for (let i = 0; i < Object.keys(logs).length; i++) { 
      // If there is a log for the day, add to streak 
      if (getLog(day)) { 
        streak += 1; 
        day = new Date(Date.now()-((i+2)*24*60*60*1000)); 
      // If a log was skipped, streak is broken - exit for loop 
      } else { 
        day = new Date(Date.now()-((i+1)*24*60*60*1000)); 
        if (getLog(day)) { 
          streak += 1; 
          day = new Date(Date.now()-((i+1)*24*60*60*1000));
        } else { 
          break; 
        }
      }
    }
    return streak; 
  }
  
  // Local storage for streak 
   function getStreakFromStorage() { 
    let streak = localStorage.getItem('streak'); 
    let returnStreak; 
    if (streak) { 
      returnStreak = parseInt(streak,10); 
    } else { 
      returnStreak = 0; 
    }
    return returnStreak;
  }
  
   function setStreakToStorage(streak) { 
    return localStorage.setItem('streak', JSON.stringify(streak));
  }
  
  
  // Get and set circles to local storage 
   function getCirclesFromStorage() { 
    let circles = localStorage.getItem('circles');
    let returnCircles; 
    if (circles) { 
      returnCircles = JSON.parse(circles);
    } else { 
      // If circles is not in local storage, create dictionary
      // 0 = Sunday, 1 = Monday, 2 = Tuesday, ...
      // All images are unchecked 
      returnCircles = {};
      returnCircles['0'] = uncheckedImgSrc;
      returnCircles['1'] = uncheckedImgSrc;
      returnCircles['2'] = uncheckedImgSrc;
      returnCircles['3'] = uncheckedImgSrc;
      returnCircles['4'] = uncheckedImgSrc;
      returnCircles['5'] = uncheckedImgSrc;
      returnCircles['6'] = uncheckedImgSrc;
    }
    return returnCircles; 
  }
  
   function setCirclesToStorage(circles) { 
    return localStorage.setItem('circles',JSON.stringify(circles));
  }
  
  // Function takes in a Date object and converts it to string compatible with other functions
   function dateToString(date) { 
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  
  // Converts 0-6 to appropriate IDs
   function convertID(num) { 
    let id ='';
    if (num===0) { 
      id='sunday-circle';
    } else if (num===1) { 
      id='monday-circle';
    } else if (num===2) { 
      id='tuesday-circle';
    } else if (num===3) { 
      id='wednesday-circle';
    } else if (num===4) { 
      id='thursday-circle';
    } else if (num===5) { 
      id='friday-circle';
    } else if (num===6) { 
      id='saturday-circle';
    }
    return id; 
  }
  
  // Reset localStorage to blank and all images to blank as well on Sunday 
   function sundayReset() { 
    let circles = getCirclesFromStorage();
    for (let i = 0; i < 7; i++) { 
      circles[`${i}`]  = uncheckedImgSrc;
      document.getElementById(convertID(i)).src = circles[`${i}`] ; 
    }
    setCirclesToStorage(circles);
  }
  
   function weekFillIn() {
    // Set variables  
    let todaysDate = new Date(); 
    let today = todaysDate.getDay(); 
    let circles = getCirclesFromStorage();
    // If today is Sunday (0), reset the circles 
    if (today===0) { 
      sundayReset();
    }
    // Integrate daily log data to circles 
    for (let i = 0; i < 7; i++) { 
      // Get all logs from Sunday to today
      let day = new Date(Date.now()-(parseInt(today-i,10)*24*60*60*1000));
      let log = getLog(day); 
      // if a log exists, fill in the circle and update local storage 
      if (log) { 
        circles[`${i}`] = checkedImgSrc;
      } else {
        circles[`${i}`] = uncheckedImgSrc;
      }
  
      const element = document.getElementById(convertID(day.getDay()));
      if (element) {
        element.src = circles[`${i}`];
      }
    }
    setCirclesToStorage(circles);
  }
  
  weekFillIn(); 
  setStreakToStorage(findStreak());
  
  const dailyStreakElement = document.getElementById('daily-streak');
  if (dailyStreakElement) {
    dailyStreakElement.textContent = getStreakFromStorage();
  }
  
  
  module.exports = {
    getLogsFromStorage,
    getLog,
    findStreak,
    getStreakFromStorage,
    setStreakToStorage,
    getCirclesFromStorage,
    setCirclesToStorage,
    dateToString,
    convertID,
    sundayReset,
    weekFillIn,
  };