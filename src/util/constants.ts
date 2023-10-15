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
 * プロセス間インターフェース定義
 */
enum ProcIfDef {
  /**
   * 文章フラッシュカードをインポート
   */
  ImportPhraseFcFile = 'my-app:import-phrase-fc-file',

  /**
   * 文章フラッシュカードをエクスポート
   */
  ExportPhraseFcFile  = 'my-app:export-phrase-fc-file',
  
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

  /**
   * 文章フラッシュカードの取得
   */
  LoadPhraseFcFile = 'my-app:load-phrase-fc-file',

  /**
   * 文章フラッシュカードの保存
   */
  SavePhraseFcFile = 'my-app:save-phrase-fc-file',

  /**
   * ウィンドウタイトル設定
   */
  SetWindowTitle = 'my-app:set-window-title',
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
  /**
   * プリファレンス
   */
  Preference = 'data-key:preference',
  /**
   * 現在のインデックス
   */
  CurrentIndex = 'data-kye:current-index',
}

/**
 * 出題順の定義
 */
enum OrderDef {
  /**
   * 先頭から
   */
  FromTheBeginning = "FromTheBeginning",
  /**
   * 出題数が少ない
   */
  LessNumberOfQuestion = "lessNumberOfQuestion",
  /**
   * 正答率が少ない
   */
  LowAccuracyRate = "lowAccuracyRate",
  /**
   * ランダム
   */
  Random = "random",
}

export { FilePath, ProcIfDef, DataKey, OrderDef }


