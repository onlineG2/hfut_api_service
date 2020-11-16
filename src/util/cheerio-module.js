const cheerio = require('cheerio')


// 解析web端考试成绩
module.exports.scorelist = (html) => {
  const $ = cheerio.load(html, { decodeEntities: false })
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
              let gradeDetail = ''
              $(this).html().split('<br>').map(ele => gradeDetail += ele + ';')

              oneLesson.gradeDetail = gradeDetail; break;
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
  return data.reverse()
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


// 解析web端考试安排
module.exports.examArrange = (html) => {
  const examInfo = []
  const $ = cheerio.load(html)
  $('tbody').find('tr').each(function (examIndex, examEle) {
    examInfo.push({
      name: $(examEle).find('td')[0].children[0].data,
      timeText: $(examEle).find('td')[1].children[0].data,
      room: $(examEle).find('td')[2].children[0].data,
    })
  })

  return examInfo
}


// 解析单个图书的借阅状态
module.exports.bookStatus = (html) => {
  const statusInfo = []
  const $ = cheerio.load(html)
  $('tr').each(function (itemIndex, itemEle) {
    if (itemIndex === 0) {
      return
    }
    let status = $(itemEle).find('td')[4].children[0].data
    if (!status) {
      try {
        status = $(itemEle).find('td')[4].children[0].children[0].data
      } catch (error) {
        status = ''
      }
    }
    statusInfo.push({
      selectNumber: $(itemEle).find('td')[0].children[0].data,
      code: $(itemEle).find('td')[1].children[0].data,
      location: $(itemEle).find('td')[3].attribs.title,
      status,
    })
  })

  return statusInfo
}

// 解析单个图书的详细信息
module.exports.bookInfo = (html) => {
  const bookInfo = {}
  const $ = cheerio.load(html)
  $('dl').each(function (itemIndex, itemEle) {
    switch ($(itemEle).children('dt').text()) {
      case '版本说明:':
        bookInfo.edition = $(itemEle).children('dd').text()
        break;
      case '出版发行项:':
        bookInfo.publish = $(itemEle).children('dd').text()
        break;
      case '载体形态项:':
        bookInfo.physics = $(itemEle).children('dd').text()
        break;
      case '提要文摘附注:':
        bookInfo.digest = $(itemEle).children('dd').text()
        break;
      case 'ISBN及定价:':
        bookInfo.price = $(itemEle).children('dd').text().split('/')[1]
        break;
      case '学科主题:':
        bookInfo.subject = $(itemEle).children('dd').text()
        break;

      default:
        break;
    }
  })
  return bookInfo
}

// 解析图书热度榜单
module.exports.bookRanking = (html) => {
  let bookRanking = []
  const $ = cheerio.load(html)
  $('table').children().each(function (itemIndex, itemEle) {
    const rankingText = $(itemEle).children().children().text()
    bookRanking = rankingText.split('  ')
  })
  return bookRanking
}

module.exports.getPreppyStuId = (html) => {
  const $ = cheerio.load(html)
  const studentId = $('button')[1].attribs.value
  return studentId
}
