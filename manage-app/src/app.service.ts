import {Injectable, Logger} from '@nestjs/common';
import {exec, spawn} from "child_process";
import {join} from "path";
import {promisify} from "util";
import {identity} from "rxjs";
import {readFile} from "fs-extra";
const pExec = promisify(exec);

@Injectable()
export class AppService {

  COLOR_RE = new RegExp("(#[a-fA-F0-9]{6})|(rgba\\([^)]+\\))|(rgb\\([^)]+\\))", "g");

  async getColors() {
    const colors = [];
    const cssFiles = (await this.getFiles()).filter(e => e.endsWith("css") || e.endsWith("rc"));
    for (const cssFile of cssFiles) {
      colors.push(await this.extractColorsFromFile(cssFile));
    }
    return colors;
  }

  async getFiles() {
    const {stdout} = await pExec("find . ! -path \"*node_modules*\" ! -path \"*git*\" ! -path \"*manage-app*\" \n", {cwd: join(__dirname, "..", "..")});
    return (stdout || '' ).split("\n").filter(identity).map(e => join(__dirname, "..", "..", e));
  }

  async extractColorsFromFile(filePath: string) {
    const fileContent = await readFile(filePath, "utf8");
    return {
      file: filePath,
      colors: Array.from(new Set(Array.from((fileContent as any).matchAll(this.COLOR_RE)).map(e => e[0])))}
  }

}
