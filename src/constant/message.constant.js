export const MESSAGES = {
  USERS: {
    AUTH: {
      COMMON: {
        EMAIL: {
          REQUIRED: '이메일을 입력해 주세요.',
          INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
          DUPLICATED: '이미 존재하는 이메일 입니다.',
          NOT_FOUND: '해당 이메일로 가입된 유저를 찾을 수 없습니다.',
        },
        PASSWORD: {
          REQUIRED: '비밀번호를 입력해 주세요.',
          MIN_LENGTH: `비밀번호는 6자리 이상이어야 합니다.`,
          INVALID: '비밀번호가 올바르지 않습니다.',
        },
        PASSWORD_CONFIRM: {
          REQUIRED: '비밀번호 확인을 입력해 주세요.',
          NOT_MATCHED_WITH_PASSWORD: '비밀번호가 일치하지 않습니다.',
        },
        NAME: {
          REQUIRED: '이름을 입력해 주세요.',
        },
        PHONE: {
          REQUIRED: '전호번호를 입력해 주세요.',
        },
        ADRESS: {
          REQUIRED: '주소를 입력해 주세요.',
        },
        UNAUTORIZED: '인증 정보가 유효하지 않습니다.',
      },
      SIGN_UP: {
        SUCCEED: '회원가입에 성공했습니다.',
      },
      SIGN_IN: {
        SUCCEED: '로그인에 성공했습니다.',
      },
    },
  },
  GOODS: {
    COMMON: {
      NAME_ALREADY_EXISTS: '굿즈 이름이 이미 존재합니다.',
      NOT_FOUND: '해당 굿즈가 존재하지 않습니다.',
      OPTION_NOT_FOUND: '해당 굿즈 옵션이 존재하지 않습니다.',
    },
    CREATE: {
      SUCCEED: '굿즈 생성에 성공했습니다.',
      GOODSNAME: {
        REQUIRED: '굿즈 이름을 입력해 주세요.',
      },
      DESCRIPTION: {
        REQUIRED: '굿즈 설명을 입력해 주세요.',
      },
      PRICE: {
        REQUIRED: '굿즈 가격을 입력해 주세요.',
      },
      THUMBNAILIMG: {
        REQUIRED: '굿즈 썸네일을 업로드해 주세요.',
      },
      DETAILIMG: {
        REQUIRED: '굿즈 상세 이미지를 업로드해 주세요.',
      },
      OPTIONS: {
        OPTIONNAME: {
          REQUIRED: '옵션 이름을 입력해 주세요.',
        },
        ADDPRICE: {
          REQUIRED: '추가 가격을 입력해 주세요.',
        },
        STOCK: {
          REQUIRED: '재고 수량을 입력해주세요.',
        },
        MIN: '최소한 하나의 옵션을 추가해야 합니다.',
        REQUIRED: '옵션 정보를 입력해 주세요.',
      },
    },
    GET_LIST: {
      SUCCEED: '굿즈 목록 불러오기에 성공했습니다.',
    },
    GET_GOODS_DETAIL: {
      SUCCEED: '굿즈 상세 불러오기에 성공했습니다.',
    },
    UPDATE_GOODS: {
      SUCCEED: '굿즈 수정에 성공했습니다.',
      OPTIONS: {
        GOODS_ID: {
          REQUIRED: '굿즈ID를 입력해주세요.',
        },
        OPTIONNAME: {
          REQUIRED: '옵션 이름을 입력해 주세요.',
        },
        ADDPRICE: {
          REQUIRED: '추가 가격을 입력해 주세요.',
        },
        STOCK: {
          REQUIRED: '재고 수량을 입력해주세요.',
        },
        MIN: '최소한 하나의 옵션을 추가해야 합니다.',
      },
    },
    UPDATE_STOCK: {
      SUCCEED: '굿즈 재고 수정에 성공했습니다.',
      REQUIRED: '재고 수량을 입력해주세요.',
    },
    DELETE_GOODS: {
      SUCCEED: '굿즈 삭제에 성공했습니다.',
    },
    UPLOAD_IMG: {
      NOT_SUPPORT: '지원하지 않는 확장자 파일입니다.',
      REQUIRED_FILES_MISSING:
        '이미지 파일이 정상적으로 업로드되지 않았습니다. 다시 시도해 주세요.',
    },
  },
  S3: {
    IMG_DELETE: {
      FAIL: 'S3에서 이미지를 삭제하는데 실패했습니다.',
    },
  },
};
