import config from '@/api/config'
import _ from 'lodash'

export function buildImagePath(imagePath, imageSize, staticFlag) {
  if (_.isEmpty(imagePath)) {
    return imagePath;
  } else if (imagePath.length > 4 && imagePath.substring(0, 4) == "http") {
    return imagePath;
  } else {
    let imageSizeMap = {
      D01: '!D01',//'255*174',
      D02: '!D02',//'400*300',
      D03: '!D03',//'108*136',
      D04: '!D04',//'50*66',
      L01: '!L01',//'200*135',
      L02: '!L02',//'155*115',
      L03: '!L03',//'190*200',
      L04: '!L04',//'120*160',
      B01: '!B01',//'640*480',
      A01: '!A01',// '720*330',
      YS: '!YS',// '原始图片';
      SQ147: '!SQ147',//'147*147';
      SQ250: '!SQ250',//'250*250';
      SQ120: '!SQ120',//120*120 ;
      PD450: '!PD450',//450 不限高;
      SQ450: '!SQ450',//'450*450';
      PD750: '!PD750',//750 不限高;
    };
    let IMAGE_SERVER_NUM = 3;
    let imageSizeArr = ['!D01', '!D02', '!D03', '!D04', '!L01', '!L02', '!L03', '!L04', '!YS', '!B01', '!A01', '!SQ147', '!SQ250', '!SQ120', 'SQ450', '!PD450', 'PD750'];
    let timestamp = new Date().getTime();
    let random = timestamp % IMAGE_SERVER_NUM;
    let serverPath = config.imgServerUrl.replace("[0]", random);
    let staticPath = config.staticUrl;
    let sizePath = imageSize ? imageSizeMap[imageSize] : ''
    let flag = false;
    imageSizeArr.map(item => {
      if (imagePath.indexOf(item) != -1) {
        flag = true
      }
    })
    //cyq
    if (staticFlag) {
      if (flag) {
        return staticPath + imagePath;
      }
      return staticPath + imagePath + sizePath;
    } else {
      if (flag) {
        return serverPath + imagePath;
      }
      return serverPath + imagePath + sizePath;
    }

  }
}