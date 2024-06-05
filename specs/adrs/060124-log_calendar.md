# Creating Calendar View on Daily Log Page
## Context and Problem Statement 
Although the first intially display for the daily log page although it made sense in terms of being flex for both mobile and desktop view, it had a lot of empty space when viewing it on a laptop screen. Wanted something that would take up a lot of the screen space while also be functional. 


## Considered Options
* Calendar Display
* Dropdown for month and year
* Mini Calendar Display features
  * darken days with entry logs
  * darken days hoovered over
  * darken days selected
  * gave indictor to current date

## Decision Outcome
**Chosen option**: Calendar Display

### Description of Options

#### Calendar View
Implements a live acurate calendar. Your able to nagivate the calander via the prev and next button. The day each month haves and starts on depends on the actually calendar. Each log is linked to its corresponding day on the calendar. 


**Advantages:**
- Solves issue of white space.
- Allows the logs to be viewed on their corresponding day
- Fixes the lack of distinction between saving a new entry and editing an existing one

**Disadvantages:**
- Need to format every aspect of the calendar to account for changes in display sizes
- Having the entry log have its own date input which causes a mini calender view makes the bigger one seem less functional, overall confusing for the page
- Have to redo existing stucture for inputting logs to work with calendar
- Has a lot of mini features need to implement and maintain (prev/next buttons, live dates)


#### Dropdowns
Creates one dropdown for the months and another dropdown for the year descending from the current one.

**Advantage**
Allows quick access to a desired month/year

**Disadvantage**
- display is very buggy
- will appear where month/year was intially clicked, stays the same when scaled until doubled click causing it to not along with new location of month/year text
- when screen it very small, its hitbox overlaps with the prev/next buttons now allowing user to use those functions


#### Mini Calendar Display features
Adds variety and style to the calendar view. Also functional for the user to help gain a distinction between the days based on their relevency. 

**Advantage**
- easier to know what day it is and where to start.
- easier to find, look back, and edit existing logs

**Disadvantage**
- Could lead to bugs 
- Could require javascript to implement


## Decision Outcome

**Chosen option**: Attempt to do all of above. If not able to implement certain unimportant sub features, can simply uncomment and delete it later.

### Reasons for implementing calendar and its sub features

1. **Simplicity**: solves a lot of the formatting issues of viewing existing logs and trying to edit them.
2. **Familiarity**: users most likely have used a calender view somewhere else prior and know how to easily navigate it.
