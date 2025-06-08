export default function getMaxExperience(level: number): number {
	return Math.floor(100 * Math.pow(1.5, level));
}
