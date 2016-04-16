'use strict'

const csv = require('csv')
const fs = require('fs')

const file = process.argv[2]

let currentTeam = ''
let teams = 0

fs.readFile(file, 'utf8', (err, data) => {
  csv.parse(data, (err, participants) => {
    participants.slice(1).forEach((p, i) => {
      if (isNewTeam(p[0])) {
        displayTeam(p[0])
      }

      displayMember(p[1], p[2])
    })
  })
})


function isNewTeam (teamName) {
  teamName = teamName.trim()

  let isNew = teamName.toLowerCase() !== currentTeam.toLowerCase()

  if (isNew) {
    currentTeam = teamName
    teams += 1
  }

  return isNew
}

function displayTeam (teamName) {
  if (teamName === 'TBA') {
    teamName = `Team #${teams} (Name pending)`
  }

  console.log(`${teams}. **${teamName}**`)
}


function displayMember (first, sur) {
  first = first.trim()
  sur = sur.trim()

  console.log(`  * ${first} ${sur}`)
}
