import db from "@/lib/db";

const DAILY_GENERATION_LIMIT = 2;

export class RateLimitExceededError extends Error {
    constructor() {
        super("RATE_LIMIT_EXCEEDED");
        this.name = "RateLimitExceededError";
    }
}

/**
 * Check if the user has exceeded their daily generation limit.
 * If not, increment the counter. If yes, throw RateLimitExceededError.
 */
export async function checkAndIncrementRateLimit(userId: string) {
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });

    const today = new Date();
    const lastGenDate = user.lastGenerationDate
        ? new Date(user.lastGenerationDate)
        : null;
    const isNewDay = !lastGenDate || lastGenDate.toDateString() !== today.toDateString();

    const currentCount = isNewDay ? 0 : (user.generationCount ?? 0);

    if (currentCount >= DAILY_GENERATION_LIMIT) {
        throw new RateLimitExceededError();
    }

    await db.user.update({
        where: { id: userId },
        data: {
            generationCount: currentCount + 1,
            lastGenerationDate: today,
        },
    });
}
