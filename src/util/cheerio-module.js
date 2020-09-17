const cheerio = require('cheerio')


// 解析web端考试成绩
module.exports.scorelist = (html) => {
  const $ = cheerio.load(html)
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
            default:
              break;
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


// 解析web端个人信息
module.exports.selfinfo = (html) => {
  const $ = cheerio.load(html)
  let data = {}
  $('.list-group').first().find('span').each(function (index) {
    switch (index) {
      case 1:
        data.usercode = $(this).text(); break;
      case 3:
        data.name = $(this).text(); break;
      case 7:
        data.sex = $(this).text(); break;
      case 11:
        data.identification = $(this).text(); break;
      default:
        break;
    }
  })
  $('dl').first().find('dd').each(function (index) {
    switch (index) {
      case 5:
        data.apartment = $(this).text(); break;
      case 6:
        data.major = $(this).text(); break;
      case 8:
        data.class = $(this).text(); break;
      case 9:
        data.campus = $(this).text(); break;
    
      default:
        break;
    }
  })
  data.studentId = $('img').first().attr().src.split('/')[6].split('?')[0]
  return data
}

