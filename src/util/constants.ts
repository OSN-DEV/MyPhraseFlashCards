/**
 * データファイル関連
 */
enum FilePath {
  /**
   * アプリデータフォルダ
   */
  AppDirectory = 'MyPhraseFlashCard',
  /**
   * ファイル
   */
  PhraseFcList =  `MyPhraseFlashCard\\list.json`,
  /**
   * 設定情報
   */
  Settings = `MyPhraseFlashCard\\setting.json`,
}


/**
 * イベント定義
 */
enum EventDef {
  /**
   * 文章フラッシュカードをインポート
   */
  ImportPhraseFcFile = 'my-app:import-phrase-fc-file',
  /**
   * 文章フラッシュカードリストの取得
   */
  LoadPhraseFcList = 'my-app:load-phrase-fc-list',
  /**
   * 文章フラッシュカードリストの保存
   */
  SavePhraseFcList = 'my-app:save-phrase-fc-list',
  /**
   * 文章フラッシュカードのリストを送信
   */
  SendPhraseFcList = 'my-app:send-phrase-fc-list',
}

/**
 * ローカルストレージ キー定義
 */
enum DataKey {
  /**
   * 文章フラッシュカードのリスト
   **/
  PharasFcFileList = 'data-key:phrase-fc-file-list',
  /**
   * 現在のフラッシュカード
   */
  PhraseFcFile = 'data-key:phrase-fc-file',
}


export { FilePath, EventDef, DataKey }


