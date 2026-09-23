import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';
import { SPACING, RADII, FONTS } from '../constants';
import ScreenHeader from '../components/progress/ScreenHeader';

interface PolicyCardProps {
  icon: string;
  title: string;
  description: string;
  bulletPoints?: string[];
}

function PolicySectionCard({ icon, title, description, bulletPoints }: PolicyCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: colors.primary + '18', borderColor: colors.primary + '33' }
          ]}
        >
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      </View>

      <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{description}</Text>

      {bulletPoints && bulletPoints.length > 0 && (
        <View style={styles.bulletList}>
          {bulletPoints.map((item, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textMuted }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function PrivacyScreen() {
  const { colors } = useTheme();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Privacy Policy"
          subtitle="Your data belongs to you alone"
          colors={colors}
          showBack={true}
        />

        {/* Hero Privacy Badge Card */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: colors.primary + '12',
              borderColor: colors.primary + '38'
            }
          ]}
        >
          <View style={styles.heroHeader}>
            <Text style={styles.heroEmoji}>🛡️</Text>
            <View style={styles.heroTextCol}>
              <Text style={[styles.heroTitle, { color: colors.primary }]}>
                100% On-Device & Private
              </Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                No remote servers. No tracking. No third-party sharing.
              </Text>
            </View>
          </View>
          <Text style={[styles.heroBody, { color: colors.text }]}>
            Chai Streaks is built from the ground up as an offline-first habit tracker. All your
            habits, streaks, timer logs, and personal notes are stored strictly on your phone’s
            local storage.
          </Text>
        </View>

        {/* Section 1: Local Storage */}
        <PolicySectionCard
          icon="📱"
          title="Stored Locally on Your Mobile"
          description="Everything you create in Chai Streaks is kept within a secure, sandboxed SQLite database directly on your device."
          bulletPoints={[
            'Habit definitions, streak milestones, and completion history',
            'Focus timer logs and session history',
            'Earned achievements, scroll points, and app preferences',
            'Your data is never transmitted to cloud servers'
          ]}
        />

        {/* Section 2: No External Servers */}
        <PolicySectionCard
          icon="☁️"
          title="No Servers or User Accounts"
          description="We do not operate backend servers, remote databases, or cloud accounts for Chai Streaks."
          bulletPoints={[
            'No registration or sign-in required — start tracking instantly',
            'No analytics telemetry or telemetry tracking SDKs',
            'No remote logging of your daily routines or habits',
            'The app functions completely offline without an internet connection'
          ]}
        />

        {/* Section 3: Zero Data Sharing */}
        <PolicySectionCard
          icon="🚫"
          title="Zero Third-Party Sharing"
          description="Because your data never leaves your device, it is impossible for us or anyone else to sell, share, or monetize your information."
          bulletPoints={[
            'No advertising networks or marketing tracking code',
            'No third-party data brokers or external SDKs that harvest data',
            'No automated data extraction or telemetry reporting'
          ]}
        />

        {/* Section 4: Device Permissions */}
        <PolicySectionCard
          icon="🔔"
          title="Device Permissions & Usage"
          description="We request only the minimal permissions required to provide core features:"
          bulletPoints={[
            'Notifications: Used exclusively for local scheduled reminders generated by your device OS. No remote push servers are used.',
            'Clipboard: Used only when you explicitly tap Export Data or Import Data in Settings.'
          ]}
        />

        {/* Section 5: Data Ownership & Deletion */}
        <PolicySectionCard
          icon="🔑"
          title="Full Data Ownership & Portability"
          description="You maintain complete sovereignty over your information at all times:"
          bulletPoints={[
            'Export your entire database as clean JSON at any time from Settings',
            'Import your saved data back onto any device anytime',
            'Perform a full data reset in Settings to permanently delete all local records'
          ]}
        />

        {/* Bottom Assurance Card */}
        <View
          style={[
            styles.quoteCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
        >
          <Text style={[styles.quoteText, { color: colors.text }]}>
            “Your privacy is brewed into our core. No servers. No ads. Just your chai and your
            habits.”
          </Text>
          <Text style={[styles.quoteAuthor, { color: colors.textMuted }]}>
            — The Chai Streaks Team
          </Text>
        </View>

        {/* Return Button */}
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1
            }
          ]}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>← Back to Settings</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },

  scroll: {
    padding: SPACING.base,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    gap: SPACING.base
  },

  heroCard: {
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    padding: SPACING.lg,
    gap: SPACING.md
  },

  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md
  },

  heroEmoji: {
    fontSize: 32
  },

  heroTextCol: {
    flex: 1,
    gap: 2
  },

  heroTitle: {
    fontFamily: FONTS.wavy,
    fontSize: 20
  },

  heroSub: {
    fontFamily: FONTS.handwritten,
    fontSize: 14
  },

  heroBody: {
    fontFamily: FONTS.handwritten,
    fontSize: 15,
    lineHeight: 22
  },

  card: {
    borderRadius: RADII.xl,
    borderWidth: 1,
    padding: SPACING.base,
    gap: SPACING.sm
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md
  },

  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: RADII.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconText: {
    fontSize: 18
  },

  cardTitle: {
    flex: 1,
    fontFamily: FONTS.wavy,
    fontSize: 17
  },

  cardDesc: {
    fontFamily: FONTS.handwritten,
    fontSize: 14,
    lineHeight: 20
  },

  bulletList: {
    marginTop: 4,
    gap: 6
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xs
  },

  bulletDot: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold'
  },

  bulletText: {
    flex: 1,
    fontFamily: FONTS.handwritten,
    fontSize: 13,
    lineHeight: 18
  },

  quoteCard: {
    borderRadius: RADII.xl,
    borderWidth: 1,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.xs
  },

  quoteText: {
    fontFamily: FONTS.sketch,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22
  },

  quoteAuthor: {
    fontFamily: FONTS.handwritten,
    fontSize: 13
  },

  backButton: {
    borderRadius: RADII.xl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs
  },

  backButtonText: {
    color: '#FFFFFF',
    fontFamily: FONTS.wavy,
    fontSize: 16
  }
});
