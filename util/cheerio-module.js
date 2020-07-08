const cheerio = require('cheerio')

module.exports.scorelist = (html) => {
  const $ = cheerio.load(html)
  console.log('拿到了')
  let data = []
  $('.container-fluid').find('.row').each(function () {
    let oneSemester = {}
    let scorelist = []
    oneSemester.semesterName = $(this).find('h3').text()

    $(this).find('tr').each(function (index) {
      if (index > 0) {
        let oneLesson = {}
        $(this).find('td').each(function (index) {
          switch (index) {
            case 0:
              oneLesson.lessonName = $(this).text(); break;
            case 1:
              oneLesson.lessonCode = $(this).text(); break;
            case 2:
              oneLesson.lessonClassCode = $(this).text(); break;
            case 3:
              oneLesson.credit = $(this).text(); break;
            case 4:
              oneLesson.gpa = $(this).text(); break;
            case 5:
              oneLesson.grade = $(this).text(); break;
            case 6:
              oneLesson.gradeDetail = $(this).text(); break;
          }
        })
        scorelist.push(oneLesson);
      }
    })

    oneSemester.scorelist = scorelist
    data.push(oneSemester)
  })

  return data
}

