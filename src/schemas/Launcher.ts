import { Schema, model, Document } from 'mongoose'

interface PatchLinks {
    small: string;
    large: string;
}

interface RedditLinks {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
}

interface FlickrLinks {
    small: string[];
    original: string[];
}

interface Links {
    patch: PatchLinks;
    reddit: RedditLinks;
    flickr: FlickrLinks;
    presskit: string | null;
    webcast: string;
    youtube_id: string;
    article: string | null;
    wikipedia: string;
}

interface CrewMember {
    crew: string;
    role: string;
}

interface Core {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: string;
}

export interface LauncherInterface extends Document {
    fairings: any | null;
    links: Links;
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: any | null;
    rocket: string;
    success: boolean;
    failures: any[];
    details: string | null;
    crew: CrewMember[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string;
    id: string;
}

const PatchLinksSchema = new Schema({
    small: String,
    large: String
});

const RedditLinksSchema = new Schema({
    campaign: String,
    launch: String,
    media: String,
    recovery: String
});

const FlickrLinksSchema = new Schema({
    small: [String],
    original: [String]
});

const LinksSchema = new Schema({
    patch: PatchLinksSchema,
    reddit: RedditLinksSchema,
    flickr: FlickrLinksSchema,
    presskit: String,
    webcast: String,
    youtube_id: String,
    article: String,
    wikipedia: String
});

const CrewMemberSchema = new Schema({
    crew: String,
    role: String
});

const CoreSchema = new Schema({
    core: String,
    flight: Number,
    gridfins: Boolean,
    legs: Boolean,
    reused: Boolean,
    landing_attempt: Boolean,
    landing_success: Boolean,
    landing_type: String,
    landpad: String
});

const LauncherSchema = new Schema({
    fairings: Object,
    links: LinksSchema,
    static_fire_date_utc: String,
    static_fire_date_unix: Number,
    net: Boolean,
    window: Object,
    rocket: String,
    success: Boolean,
    failures: [Object],
    details: String,
    crew: [CrewMemberSchema],
    ships: [String],
    capsules: [String],
    payloads: [String],
    launchpad: String,
    flight_number: Number,
    name: String,
    date_utc: String,
    date_unix: Number,
    date_local: String,
    date_precision: String,
    upcoming: Boolean,
    cores: [CoreSchema],
    auto_update: Boolean,
    tbd: Boolean,
    launch_library_id: String,
    id: String
});

export default model<LauncherInterface>('Launch', LauncherSchema)