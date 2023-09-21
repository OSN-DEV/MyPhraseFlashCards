/**
 * エラーコード
 */
enum ErrorCode {
  /**
   * エラーなし
   */
  None = 0,
  /**
   * キャンセル
   */
  Canceled = 1,
  /**
   * すでに存在する
   */
  Exist = 2,
  /**
   * 不正
   */
  Invalid = 3,
  /**
   * 予期せぬエラー
   */
  Unknown  = 999
}

type  ResultModel = {
  code : ErrorCode,
  message: string
}

export { ErrorCode, ResultModel };

