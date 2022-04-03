export function compLevelName(compLevel) {
  switch (compLevel) {
    case "qm":
      return "Qualification";
    case "qf":
      return "Quarterfinal";
    case "sf":
      return "Semifinal";
    case "f":
      return "Final";
    default:
      return "Unknown match type";
  }
}
