/**
 * localStorage에 저장하는 지하철역 포맷 (DTO)
 * 노선 링크드리스트에 쓰이는 노드
 */
export default class StationNode {
  constructor({ name, line = [], prev = null, next = null } = {}) {
    this.name = name;
    this.line = line;
    this.prev = prev;
    this.next = next;
  }
}
