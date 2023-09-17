abstract class Preferences {
    /**
     * 環境設定クラスをクローンして編集
     * @param param 変更内容
     * @returns クローンした環境設定クラス
     */
    public abstract cloneEdit(param: any): Preferences;
}
export { Preferences };
