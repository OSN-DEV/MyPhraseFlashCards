/**
 * エラーコード
 */
enum ResultCode {
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
  code : ResultCode,
  message: string
}

export { ResultCode, ResultModel };

